import { ElementOptions, Value } from '../base';

export type TextOutputOptions = ElementOptions & {
    value?: string;
}

export class TextOutput extends Value<string> {
    protected _output: HTMLSpanElement;

    // @internal
    public constructor(
        parent: HTMLElement, id: string, options: TextOutputOptions
    ) {
        super(parent, id, options);

        this._value = options.value ?? '';
        this._default = this._value;

        this._output = document.createElement('span');
        this._output.id = this._id;
        this._output.textContent = this._value;
        this._container.appendChild(this._output);
    }

    public override set value(value: string) {
        super.value = value;
        this._output.textContent = this._value;
    }

    public override get value(): string {
        return super.value;
    }

    public get elements(): HTMLSpanElement[] {
        return [this._output];
    }
}
