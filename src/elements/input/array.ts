import { ElementOptions, Handler, ValueInput } from '../base';

export type ArrayInputOptions = ElementOptions & {
    length?: number,
    value?: number[];
    handler?: Handler<number[]>;
}

export class ArrayInput extends ValueInput<number[]> {
    protected _inputs: HTMLInputElement[] = [];

    // @internal
    public constructor(
        parent: HTMLElement,
        id: string,
        options: ArrayInputOptions,
        defaultHandleOnInit: boolean
    ) {
        super(parent, id, options);

        const length = options.length ?? 1;

        this._value = new Array(length).fill(0);
        options.value?.forEach((v, i) => this._value[i] = v);
        this._default = this._value.slice();
        this._handler = options.handler;

        for (let i = 0; i < length; i++) {
            const input = document.createElement('input');
            if (i === 0) input.id = this._id;
            input.type = 'number';
            input.value = this._value[i].toString();
            this._internalHandler = () => {
                this._value[i] = Number(input.value);
                this._handler(this._value);
            };
            input.onchange = this._internalHandler;
            this._container.appendChild(input);
            this._inputs.push(input);
        }

        if (options.handleOnInit || defaultHandleOnInit)
            this._internalHandler();
    }

    public override set value(value: number[]) {
        value?.forEach((v, i) => {
            this._value[i] = v;
            this._inputs[i].value = v.toString();
        });
    }

    public override get value(): number[] {
        return super.value;
    }

    public invokeHandler(): void {
        this._handler?.(this._value);
    }

    public override setFromObject(obj: unknown, invokeHandler?: boolean): void {
        if (!Array.isArray(obj)) return;
        obj.slice(0, this._value.length).forEach((v, i) => {
            if (typeof(v) !== 'number') return;
            this._value[i] = v;
            this._inputs[i].value = v.toString();
        });
        if (invokeHandler) this.invokeHandler();
    }

    public override get elements(): HTMLInputElement[] {
        return this._inputs.slice();
    }
}
