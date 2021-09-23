import { ElementOptions, Handler, ValueInput } from '../base';

type Selection = {
    index: number,
    value: string
}

export type SelectInputOptions = ElementOptions & {
    /**
     * Visible selection options. Defaults to optionValues if not specified.
     * See https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement
     * for difference.
     **/
    optionTexts?: string[];
    /**
     * Actual selection values. Defaults to optionTexts if not specified.
     * See https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement
     * for difference.
     **/
    optionValues?: string[];
    /**
     * Initially selected index.
     * Note: Initially selected value takes precedence.
     */
    index?: number;
    /**
     * Initially selected value.
     */
    value?: string;
    handler?: Handler<Selection>;
}

export class SelectInput extends ValueInput<string, Selection> {
    protected _input: HTMLSelectElement;
    protected _index: number;
    protected _values: string[];
    protected _texts: string[];

    // @internal
    public constructor(
        parent: HTMLElement,
        id: string,
        options: SelectInputOptions,
        defaultHandleOnInit: boolean
    ) {
        super(parent, id, options);

        this._input = document.createElement('select');
        this._input.id = this._id;

        this._values = options.optionValues;
        this._texts = options.optionTexts;
        this.buildOptions();

        if (options.index) this._input.selectedIndex = options.index;
        if (options.value) this._input.value = options.value;

        this._value = this._input.value;
        this._index = this._input.selectedIndex;
        this._default = this._value;

        this._handler = options.handler;
        this._internalHandler = () => {
            this._value = this._input.value;
            this._index = this._input.selectedIndex;
            this._handler?.({ value: this._value, index: this._index });
        };
        this._input.onchange = this._internalHandler;

        this._container.appendChild(this._input);

        if (options.handleOnInit || defaultHandleOnInit)
            this._internalHandler();
    }

    public override set value(value: string) {
        super.value = value;
        this._input.value = this._value;
        this._index = this._input.selectedIndex;
    }

    public override get value(): string {
        return super.value;
    }

    public set index(value: number) {
        this._index = value;
        this._input.selectedIndex = this._index;
        this._value = this._input.value;
    }

    public get index(): number {
        return this._index;
    }

    public invokeHandler(): void {
        this._handler?.({ value: this._value, index: this._index });
    }

    protected buildOptions(): void {
        const num = Math.max(
            this._values?.length ?? 0,
            this._texts?.length ?? 0);

        while (this._input.length) this._input.remove(0);

        for (let i = 0; i < num; i++) {
            const elem = document.createElement('option');
            elem.value = this._values?.[i] ?? this._texts?.[i] ?? i.toString();
            elem.text = this._texts?.[i] ?? this._values?.[i] ?? i.toString();
            this._input.appendChild(elem);
        }
    }

    public set values(values: string[]) {
        this._values = values;
        this.buildOptions();
    }

    public get values(): string[] {
        return this._values;
    }

    public set texts(texts: string[]) {
        this._texts = texts;
        this.buildOptions();
    }

    public get texts(): string[] {
        return this._texts;
    }
}
