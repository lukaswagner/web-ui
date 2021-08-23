import { BaseOptions, Handler, ValueInput } from "../base";

type Selection = {
    index: number,
    value: string
}

export type SelectInputOptions = BaseOptions & {
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
    protected _interalHandler: () => void;
    protected _index: number;

    public constructor(
        parent: HTMLElement, id: string, options: SelectInputOptions
    ) {
        super(parent, id, options);

        this._input = document.createElement('select');
        this._input.id = this._id;

        const numOptions = Math.max(
            options.optionValues?.length ?? 0,
            options.optionTexts?.length ?? 0);

        for(let i = 0; i < numOptions; i++) {
            const elem = document.createElement('option');
            elem.value =
                options.optionValues?.[i] ??
                options.optionTexts?.[i] ??
                i.toString();
            elem.text =
                options.optionTexts?.[i] ??
                options.optionValues?.[i] ??
                i.toString();
            this._input.appendChild(elem);
        }

        if(options.index) this._input.selectedIndex = options.index;
        if(options.value) this._input.value = options.value;

        this._value = this._input.value;
        this._index = this._input.selectedIndex;

        this._handler = options.handler;
        this._interalHandler = () => {
            this._value = this._input.value;
            this._index = this._input.selectedIndex;
            this._handler?.({ value: this._value, index: this._index });
        };
        this._input.onchange = this._interalHandler;

        this._container.appendChild(this._input);
    }

    public set value(value: string) {
        super.value = value;
        this._input.value = this._value;
        this._index = this._input.selectedIndex;
    }

    public get value(): string {
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
}