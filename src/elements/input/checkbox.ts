import { BaseOptions, Handler, ValueInput } from '../base';

export type CheckboxInputOptions = BaseOptions & {
    value?: boolean;
    handler?: Handler<boolean>;
}

export class CheckboxInput extends ValueInput<boolean> {
    protected _input: HTMLInputElement;
    protected _interalHandler: () => void;

    public constructor(
        parent: HTMLElement, id: string, options: CheckboxInputOptions
    ) {
        super(parent, id, options);

        this._value = options.value ?? false;
        this._handler = options.handler;

        this._input = document.createElement('input');
        this._input.id = this._id;
        this._input.type = 'checkbox';
        this._input.value = this._value.toString();
        this._interalHandler = () => {
            this._value = this._input.checked;
            this._handler?.(this._value);
        };
        this._input.onchange = this._interalHandler;
        this._container.appendChild(this._input);
    }

    public set value(value: boolean) {
        super.value = value;
        this._input.value = this._value.toString();
    }

    public get value(): boolean {
        return super.value;
    }
}
