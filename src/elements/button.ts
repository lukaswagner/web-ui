import { BaseOptions, Handler, Input } from "./base";

export type ButtonOptions = BaseOptions & {
    text?: string;
    handler?: Handler<void>;
}

export class Button extends Input<void> {
    protected _button: HTMLButtonElement;

    public constructor(
        parent: HTMLElement, id: string, options: ButtonOptions
    ) {
        super(parent, id, options);

        this._handler = options.handler;

        this._button = document.createElement('button');
        this._button.id = this._id;
        this._button.textContent = options.text;
        this._button.onclick = () => this._handler?.();
        this._container.appendChild(this._button);
    }
}
