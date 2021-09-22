import { ElementOptions, Handler, ValueInput } from '../base';

export type NumberInputOptions = ElementOptions & {
    value?: number;
    handler?: Handler<number>;
}

export class NumberInput extends ValueInput<number> {
    protected _input: HTMLInputElement;

    // @internal
    public constructor(
        parent: HTMLElement,
        id: string,
        options: NumberInputOptions,
        defaultHandleOnInit: boolean
    ) {
        super(parent, id, options);

        this._value = options.value ?? 0;
        this._default = this._value;
        this._handler = options.handler;

        this._input = document.createElement('input');
        this._input.id = this._id;
        this._input.type = 'number';
        this._input.value = this._value.toString();
        this._internalHandler = () => {
            this._value = Number(this._input.value);
            this._handler?.(this._value);
        };
        this._input.onchange = this._internalHandler;
        this._container.appendChild(this._input);

        if(options.handleOnInit || defaultHandleOnInit) this._internalHandler();
    }

    public override set value(value: number) {
        super.value = value;
        this._input.value = this._value.toString();
    }

    public override get value(): number {
        return super.value;
    }
}
