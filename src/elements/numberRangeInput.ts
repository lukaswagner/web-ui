import { RangeInputOptions, RangeInput } from "./rangeInput";

export type NumberRangeInputOptions = RangeInputOptions & {};

export class NumberRangeInput extends RangeInput {
    protected _number: HTMLInputElement;

    public constructor(
        parent: HTMLElement, id: string, options: NumberRangeInputOptions
    ) {
        super(parent, id, options);

        this._number = document.createElement('input');
        this._number.id = this._id;
        this._input.removeAttribute('id');
        this._number.type = 'number';
        this._number.value = this._value.toString();

        this._number.onchange = () => {
            this._input.value = this._number.value;
            this._interalHandler();
        }

        const inputHandler = () => {
            this._number.value = this._input.value;
            this._interalHandler();
        }
        if (options.triggerHandlerOnMove) {
            this._input.oninput = inputHandler;
        } else {
            this._input.onchange = inputHandler;
        }

        this._container.insertBefore(this._number, this._input);
    }
}
