import { Element, ElementOptions, Handler } from '../base';

type ButtonOptions = {
    handleOnInit?: boolean;
    text?: string;
    handler?: Handler<void>;
}

export type ButtonArrayOptions = ElementOptions & {
    buttons?: ButtonOptions[]
}

export class ButtonArray extends Element {
    protected _handlers: Handler<void>[] = [];
    protected _buttons: HTMLButtonElement[] = [];

    // @internal
    public constructor(
        parent: HTMLElement, id: string, options: ButtonArrayOptions
    ) {
        super(parent, id, options);

        options.buttons?.forEach((b, i) => {
            this._handlers.push(b.handler);

            const elem = document.createElement('button');
            elem.textContent = b.text;
            elem.type = 'button';
            elem.onclick = () => this._handlers[i]?.();
            this._container.appendChild(elem);
            this._buttons.push(elem);

            // button does not use defaultHandleOnInit
            if (b.handleOnInit ?? options.handleOnInit)
                this._handlers[i]?.();
        });
    }

    public reset(): void { }

    public invokeHandler(i?: number): void {
        if (i === undefined) this._handlers.forEach((h) => h());
        else this._handlers[i]?.();
    }

    public override setFromObject(): void { }

    public get elements(): HTMLButtonElement[] {
        return this._buttons;
    }
}
