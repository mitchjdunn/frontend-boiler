export interface Style{
    id: string;
    class: string;
    
    styleElement(element: HTMLElement): void;
}

export class CSSStyle implements Style{
    id: string;
    class: string;

    styleElement(element: HTMLElement) {
        if (this.id)
            element.id = this.id;
        if (this.class){
            if (element.className)
                element.className = element.className + " " + this.class;
            else
                element.className = this.class;
        }
    }
}