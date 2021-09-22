import { RangeInput, RangeInputOptions } from './range';

export type NumberRangeInputOptions = RangeInputOptions;

export class NumberRangeInput extends RangeInput {
    protected _number: HTMLInputElement;

    // @internal
    public constructor(
        parent: HTMLElement,
        id: string,
        options: NumberRangeInputOptions,
        defaultHandleOnInit: boolean
    ) {
        super(parent, id, options, defaultHandleOnInit);

        this._number = document.createElement('input');
        this._number.id = this._id;
        this._input.removeAttribute('id');
        this._number.type = 'number';
        this._number.value = this._value.toString();

        this._number.onchange = () => {
            this._input.value = this._number.value;
            this._internalHandler();
        };

        const inputHandler = (): void => {
            this._number.value = this._input.value;
            this._internalHandler();
        };
        if (options.triggerHandlerOnMove) {
            this._input.oninput = inputHandler;
        } else {
            this._input.onchange = inputHandler;
        }

        this._container.insertBefore(this._number, this._input);
    }

    public override set value(value: number) {
        super.value = value;
        this._number.value = this._input.value;
    }

    public override get value(): number {
        return super.value;
    }
}
