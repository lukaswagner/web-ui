import { BaseOptions, Handler, ValueInput } from '../base';

export type ArrayInputOptions = BaseOptions & {
    length?: number,
    value?: number[];
    handler?: Handler<number[]>;
}

export class ArrayInput extends ValueInput<number[]> {
    protected _inputs: HTMLInputElement[] = [];
    protected _internalHandler: () => void;

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

        if(options.handleOnInit || defaultHandleOnInit) this._internalHandler();
    }

    public set value(value: number[]) {
        value?.forEach((v, i) => this._value[i] = v);
        value.forEach((v, i) => {
            this._inputs[i].value = v.toString();
        });
    }

    public get value(): number[] {
        return super.value;
    }
}
