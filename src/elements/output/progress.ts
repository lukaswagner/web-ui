import { ElementOptions, Value } from '../base';

export type ProgressOutputOptions = ElementOptions & {
    value?: number;
}

export class ProgressOutput extends Value<number> {
    protected _output: HTMLProgressElement;

    // @internal
    public constructor(
        parent: HTMLElement, id: string, options: ProgressOutputOptions
    ) {
        super(parent, id, options);

        this._value = options.value ?? 0;
        this._default = this._value;

        this._output = document.createElement('progress');
        this._output.id = this._id;
        this._output.value = this._value;
        this._container.appendChild(this._output);
    }

    public override set value(value: number) {
        super.value = value;
        this._output.value = this._value;
    }

    public override get value(): number {
        return super.value;
    }

    public get elements(): HTMLProgressElement[] {
        return [this._output];
    }
}
