import { Style } from "../Style";

export interface Renderable {
     style: Style;
     render(): Node;
}