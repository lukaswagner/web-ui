import { Button, ButtonOptions } from "./elements/Button";
import { TextInputOptions, TextInput } from "./elements/textInput";
import { NumberInput, NumberInputOptions } from "./elements/numberInput";
import { NumberRangeInput, NumberRangeInputOptions } from "./elements/numberRangeInput";
import { RangeInput, RangeInputOptions } from "./elements/rangeInput";
import { ArrayInput, ArrayInputOptions } from "./elements/arrayInput";
import { TextOutputOptions, TextOutput } from "./elements/textOutput";

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

    public input = {
        button: (options: ButtonOptions = {}) => {
            return this.create<Button, ButtonOptions>(Button, options);
        },
        number: (options: NumberInputOptions = {}) => {
            return this.create<NumberInput, NumberInputOptions>(
                NumberInput, options);
        },
        range: (options: RangeInputOptions = {}) => {
            return this.create<RangeInput, RangeInputOptions>(
                RangeInput, options);
        },
        numberRange: (options: NumberRangeInputOptions = {}) => {
            return this.create<NumberRangeInput, NumberRangeInputOptions>(
                NumberRangeInput, options);
        },
        text: (options: TextInputOptions = {}) => {
            return this.create<TextInput, TextInputOptions>(
                TextInput, options);
        },
        array: (options: ArrayInputOptions = {}) => {
            return this.create<ArrayInput, ArrayInputOptions>(
                ArrayInput, options);
        }
    }

    public output = {
        text: (options: TextOutputOptions = {}) => {
            return this.create<TextOutput, TextOutputOptions>(
                TextOutput, options);
        }
    }
}
