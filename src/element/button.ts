import { Input } from "./base";

export class button extends Input<void> {
    protected _button: HTMLButtonElement;

    public constructor(parent: HTMLElement, id: string) {
        super(parent, id);

        this._button = document.createElement('button');
        this._button.id = this._id;
        this._button.onclick = () => this._handler();
        this._container.appendChild(this._button);
    }
}
