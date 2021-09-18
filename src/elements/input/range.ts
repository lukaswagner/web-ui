import { NumberInput, NumberInputOptions } from './number';

export type RangeInputOptions = NumberInputOptions & {
    min?: number,
    max?: number,
    step?: number,
    triggerHandlerOnMove?: boolean
}

export class RangeInput extends NumberInput {
    protected _min: number;
    protected _max: number;
    protected _step: number;

    public constructor(
        parent: HTMLElement,
        id: string,
        options: RangeInputOptions,
        defaultHandleOnInit: boolean
    ) {
        super(parent, id, options, defaultHandleOnInit);

        this._input.type = 'range';

        const fallbackRange = options.step ? options.step * 10 : 1;
        this.min = options.min ?? this._value - fallbackRange;
        this.max = options.max ?? this._value + fallbackRange;
        this.step = options.step ?? (this._max - this._min) / 20;

        if (options.triggerHandlerOnMove) {
            this._input.oninput = this._internalHandler;
            this._input.onchange = undefined;
        }
    }

    public set min(value: number) {
        this._min = value;
        this._input.min = this._min.toString();
    }

    public get min(): number {
        return this._min;
    }

    public set max(value: number) {
        this._max = value;
        this._input.max = this._max.toString();
    }

    public get max(): number {
        return this._max;
    }

    public set step(value: number) {
        this._step = value;
        this._input.step = this._step.toString();
    }

    public get step(): number {
        return this._step;
    }
}
