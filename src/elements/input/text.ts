import { ElementOptions, Handler, ValueInput } from '../base';

type TextType = 'text' | 'color' | 'email' | 'password' | 'url';

export type TextInputOptions = ElementOptions & {
    type?: TextType;
    value?: string;
    handler?: Handler<string>;
}

export class TextInput extends ValueInput<string> {
    protected _input: HTMLInputElement;

    // @internal
    public constructor(
        parent: HTMLElement,
        id: string,
        options: TextInputOptions,
        defaultHandleOnInit: boolean
    ) {
        super(parent, id, options);

        const type = options.type ?? 'text';

        this._value = options.value ?? this.defaultForType(type);
        this._default = this._value;
        this._handler = options.handler;

        this._input = document.createElement('input');
        this._input.id = this._id;
        this._input.type = type;
        this._input.value = this._value;
        this._internalHandler = () => {
            this._value = this._input.value;
            this._handler?.(this._value);
        };
        this._input.onchange = this._internalHandler;
        this._container.appendChild(this._input);

        if (options.handleOnInit ?? defaultHandleOnInit)
            this._internalHandler();
    }

    public override set value(value: string) {
        super.value = value;
        this._input.value = this._value;
    }

    public override get value(): string {
        return super.value;
    }

    protected defaultForType(type: TextType): string {
        switch (type) {
            case 'text':
            case 'email':
            case 'password':
            case 'url':
                return '';
            case 'color':
                return '#000000';
            default:
                break;
        }
    }

    public invokeHandler(): void {
        this._handler?.(this._value);
    }

    public get elements(): HTMLInputElement[] {
        return [this._input];
    }
}
