import { BaseOptions, Handler, ValueInput } from '../base';

export type CheckboxInputOptions = BaseOptions & {
    value?: boolean;
    handler?: Handler<boolean>;
}

export class CheckboxInput extends ValueInput<boolean> {
    protected _input: HTMLInputElement;
    protected _internalHandler: () => void;

    public constructor(
        parent: HTMLElement,
        id: string,
        options: CheckboxInputOptions,
        defaultHandleOnInit: boolean
    ) {
        super(parent, id, options);

        this._value = options.value ?? false;
        this._handler = options.handler;

        this._input = document.createElement('input');
        this._input.id = this._id;
        this._input.type = 'checkbox';
        this._input.checked = this._value;
        this._internalHandler = () => {
            this._value = this._input.checked;
            this._handler?.(this._value);
        };
        this._input.onchange = this._internalHandler;
        this._container.appendChild(this._input);

        if(options.handleOnInit || defaultHandleOnInit) this._internalHandler();
    }

    public set value(value: boolean) {
        super.value = value;
        this._input.checked = this._value;
    }

    public get value(): boolean {
        return super.value;
    }
}
