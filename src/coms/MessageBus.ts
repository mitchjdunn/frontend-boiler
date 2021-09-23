import { NewLineKind } from "typescript";

/**
 * Responsibilities of the event bus
 *  1. ledger of waiters
 *  2. hub for sender
 *  3. pass message of sender to all waiters of that message type
 */
export interface MessageBus {
    addWaiter(messsage: Message, waiterId: string, waiterPriority: WaiterPriority, callback: (args : {}) => void) : void;
    removeWaiter(message: Message, waiterId: string);
    removeWaiters(message: Message, waiterIds: string[]);
    sendMessage(message: Message);
}

export enum WaiterPriority {
    first,
    high,
    medium,
    low,
    last
}

export interface Message{
    messageName: string;
    setArgs(args: {}): void;
    getArgs(): {};
    validateArgs(args: {}): boolean;
}

class GenericMessageBusWaiters {
    firstWaiter: {waiterId: string, callback: (args: Message) => void } = null;
    highWaiters: Map<string, (args: Message) => void> = null;
    mediumWaiters: Map<string, (args: Message) => void> = null;
    lowWaiters: Map<string, (args: Message) => void> = null;
    lastWaiter: {waiterId: string, callback: (args: Message) => void } = null;

    constructor(){
    this.highWaiters = new Map<string, (args: Message) => void>();
    this.mediumWaiters = new Map<string, (args: Message) => void>();
    this.lowWaiters = new Map<string, (args: Message) => void>();
    }

    sendMessage(message: Message) {
        if(this.firstWaiter)
            this.firstWaiter.callback(message);
        this.highWaiters.forEach(callback => callback(message));
        this.mediumWaiters.forEach(callback => callback(message));
        this.lowWaiters.forEach(callback => callback(message));
        if(this.lastWaiter)
            this.lastWaiter.callback(message);
    }

    delete(waiterId: string) {
        if(this.firstWaiter && this.firstWaiter.waiterId == waiterId)
            this.firstWaiter = null;
        if(this.highWaiters.get(waiterId))
            this.highWaiters.delete(waiterId);
        if(this.mediumWaiters.get(waiterId))
            this.mediumWaiters.delete(waiterId);
        if(this.lowWaiters.get(waiterId))
            this.lowWaiters.delete(waiterId);
        if(this.lastWaiter && this.lastWaiter.waiterId == waiterId)
            this.lastWaiter = null;
    }

    set(waiterId: string, waiterPriority: WaiterPriority, callback: (args: Message) => void) {
        switch(waiterPriority){
            case WaiterPriority.first:
                if(this.firstWaiter)
                    throw new Error("First Waiter already defined");
                this.firstWaiter = {waiterId: waiterId, callback: callback};
                break;
            case WaiterPriority.high:
                this.highWaiters.set(waiterId, callback);
                break;
            case WaiterPriority.medium:
                this.mediumWaiters.set(waiterId, callback);
                break;
            case WaiterPriority.low:
                this.lowWaiters.set(waiterId, callback);
                break;
            case WaiterPriority.last:
                if(this.lastWaiter)
                    throw new Error("Last Waiter Already Defined")
                this.lastWaiter = {waiterId: waiterId, callback: callback};
                break;
            default:
                throw new Error("Message Priority not defined for Generic Messsage Bus");
        }
    }
}
export class GenericMessageBus implements MessageBus{
    registeredMessages: { [id: string]: Message}[] = [];
    waitersMap: Map<string, GenericMessageBusWaiters> = new Map<string, GenericMessageBusWaiters>();

    debug: boolean = false;

    setDebug(bool: boolean){
        this.debug = bool;
    }

    addWaiter (message: Message, waiterId: string, waiterPriority: WaiterPriority,
         callback: (args: Message) => void): void {

        if(this.waitersMap.get(message.messageName)){
            if(this.debug)
                console.log("appending", waiterId, "to", message.messageName);
            this.waitersMap.get(message.messageName).set(waiterId, waiterPriority, callback);
        }else{
            if(this.debug)
                console.log("adding", waiterId,"to", message.messageName);
            this.registeredMessages[message.messageName] = message;
            var waiters = new GenericMessageBusWaiters();
            waiters.set(waiterId, waiterPriority, callback);
            this.waitersMap.set(message.messageName, waiters);
        }
    }
    removeWaiter (message: Message, waiterId: string) {
        if(this.waitersMap.get(message.messageName)){
            this.waitersMap.get(message.messageName).delete(waiterId);
        }
    }
    removeWaiters (message: Message, waiterIds: string[]) {
        if(this.waitersMap.get(message.messageName)){
            waiterIds.forEach(
                (waiterId) => this.waitersMap.get(message.messageName).delete(waiterId)
            );
        }
    }
    sendMessage(message: Message) {
            if(this.debug){
                console.log("sending message", message);
                console.log(this.waitersMap);
            }
        if(!this.registeredMessages[message.messageName]){
            throw new Error("Message type not registered")
        }
        if(this.waitersMap.get(message.messageName)){
            let waiters: GenericMessageBusWaiters = this.waitersMap.get(message.messageName);

            waiters.sendMessage(message);
        }
    }

}

export class GenericMessage implements Message{
    messageName: string;
    args: {} = null;

    constructor(messageName: string){
        this.messageName = messageName;
    }
    getArgs(): {} {
        return this.args;
    }

    setArgs(args: {}): void {
        this.args = args;
    }

    validateArgs(args: {}): boolean {
        return true;
    }
}
