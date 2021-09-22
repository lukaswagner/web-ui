import { ElementOptions, Handler, Input } from '../base';

export type ButtonOptions = ElementOptions & {
    text?: string;
    handler?: Handler<void>;
}

export class Button extends Input<void> {
    protected _button: HTMLButtonElement;

    // @internal
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

        // button does not use defaultHandleOnInit
        if(options.handleOnInit) this._handler?.();
    }

    public reset(): void { };
}
