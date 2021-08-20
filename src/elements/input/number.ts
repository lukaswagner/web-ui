import { BaseOptions, Handler, ValueInput } from "../base";

export type NumberInputOptions = BaseOptions & {
    value?: number;
    handler?: Handler<number>;
}

export class NumberInput extends ValueInput<number> {
    protected _input: HTMLInputElement;
    protected _interalHandler: () => void;

    public constructor(
        parent: HTMLElement, id: string, options: NumberInputOptions
    ) {
        super(parent, id, options);

        this._value = options.value ?? 0;
        this._handler = options.handler;

        this._input = document.createElement('input');
        this._input.id = this._id;
        this._input.type = 'number';
        this._input.value = this._value.toString();
        this._interalHandler = () => {
            this._value = Number(this._input.value);
            this._handler?.(this._value);
        };
        this._input.onchange = this._interalHandler;
        this._container.appendChild(this._input);
    }

    public set value(value: number) {
        super.value = value;
        this._input.value = this._value.toString();
    }

    public get value(): number {
        return super.value;
    }
}
