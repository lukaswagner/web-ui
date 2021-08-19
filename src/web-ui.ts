import { Button, ButtonOptions } from "./elements/Button";
import { TextInputOptions, TextInput } from "./elements/textInput";
import { NumberInput, NumberInputOptions } from "./elements/numberInput";
import { NumberRangeInput, NumberRangeInputOptions } from "./elements/numberRangeInput";
import { RangeInput, RangeInputOptions } from "./elements/rangeInput";

export class UI {
    protected static _nextId = 0;
    protected _idPrefix = 'ui';
    protected _container: HTMLElement;

    public constructor(container: HTMLElement) {
        this._container = container;
    }

    protected create<Type, Options>(
        type: { new(parent: HTMLElement, id: string, options: {}): Type; },
        options: Options
    ): Type {
        return new type(
            this._container,
            this._idPrefix + UI._nextId++,
            options
        );
    }

    public button(options: ButtonOptions = {}) {
        return this.create<Button, ButtonOptions>(Button, options);
    };

    public numberInput(options: NumberInputOptions = {}) {
        return this.create<NumberInput, NumberInputOptions>(
            NumberInput, options);
    };

    public rangeInput(options: RangeInputOptions = {}) {
        return this.create<RangeInput, RangeInputOptions>(
            RangeInput, options);
    };

    public numberRangeInput(options: NumberRangeInputOptions = {}) {
        return this.create<NumberRangeInput, NumberRangeInputOptions>(
            NumberRangeInput, options);
    };

    public textInput(options: TextInputOptions = {}) {
        return this.create<TextInput, TextInputOptions>(
            TextInput, options);
    };
}
