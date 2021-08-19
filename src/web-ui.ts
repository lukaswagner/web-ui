import { Button, ButtonOptions } from "./elements/Button";
import { NumberInput, NumberInputOptions } from "./elements/numberInput";

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
}
