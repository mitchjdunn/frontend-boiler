/**
 * Responsibilities of the event bus
 *  1. ledger of waiters
 *  2. hub for sender
 *  3. pass message of sender to all waiters of that message type
 */
export interface MessageBus {
    addWaiter(messsage: Message, waiterId: string, callback: (args : {}) => void) : void;
    removeWaiter(message: Message, waiterId: string);
    removeWaiters(message: Message, waiterIds: string[]);
    sendMessage(message: Message);
}

export interface Message{
    messageName: string;
    setArgs(args: {}): void;
    getArgs(): {};
    validateArgs(args: {}): boolean;
}

export class GenericMessageBus implements MessageBus{
    registeredMessages: { [id: string]: Message}[] = [];
    waiters: Map<string, Map<string, (args: Message) => void>> = new Map<string, Map<string, (args: Message) => void>>();

    debug: boolean = false;

    setDebug(bool: boolean){
        this.debug = bool;
    }

    addWaiter(message: Message, waiterId: string, callback: (args: Message) => void): void {

        if(this.waiters.get(message.messageName)){
            if(this.debug)
                console.log("appending", waiterId, "to", message.messageName);
            this.waiters.get(message.messageName).set(waiterId, callback);
        }else{
            if(this.debug)
                console.log("adding", waiterId,"to", message.messageName);
            this.registeredMessages[message.messageName] = message;
            this.waiters.set(message.messageName,new Map<string, (args: Message) => void>().set(waiterId, callback));
        }
    }
    removeWaiter(message: Message, waiterId: string) {
        if(this.waiters.get(message.messageName)){
            this.waiters.get(message.messageName).delete(waiterId);
        }
    }
    removeWaiters(message: Message, waiterIds: string[]) {
        if(this.waiters.get(message.messageName)){
            waiterIds.forEach(
                (waiterId) => this.waiters.get(message.messageName).delete(waiterId)
            );
        }
    }
    sendMessage(message: Message) {
            if(this.debug){
                console.log("sending message", message);
                console.log(this.waiters);
            }
        if(!this.registeredMessages[message.messageName]){
            throw new Error("Message type not registered")
        }
        if(this.waiters.get(message.messageName)){
            let callbackMap: Map<string, (args: Message) => void> = this.waiters.get(message.messageName);

            callbackMap.forEach((value: (args: Message) => void, key: string ) =>
            {
                if(this.debug){
                    console.log("Sending message to ", key);
                }
                value(message);
            });




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