import { BaseOptions, Handler, Value } from '../base';

export type TextOutputOptions = BaseOptions & {
    value?: string;
}

export class TextOutput extends Value<string> {
    protected _output: HTMLSpanElement;

    public constructor(
        parent: HTMLElement, id: string, options: TextOutputOptions
    ) {
        super(parent, id, options);

        this._value = options.value ?? '';

        this._output = document.createElement('span');
        this._output.id = this._id;
        this._output.textContent = this._value;
        this._container.appendChild(this._output);
    }

    public set value(value: string) {
        super.value = value;
        this._output.textContent = this._value;
    }

    public get value(): string {
        return super.value;
    }
}
