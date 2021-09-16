import { BaseOptions, Handler, Value } from '../base';

export type ProgressOutputOptions = BaseOptions & {
    value?: number;
}

export class ProgressOutput extends Value<number> {
    protected _output: HTMLProgressElement;

    public constructor(
        parent: HTMLElement, id: string, options: ProgressOutputOptions
    ) {
        super(parent, id, options);

        this._value = options.value ?? 0;

        this._output = document.createElement('progress');
        this._output.id = this._id;
        this._output.value = this._value;
        this._container.appendChild(this._output);
    }

    public set value(value: number) {
        super.value = value;
        this._output.value = this._value;
    }

    public get value(): number {
        return super.value;
    }
}
