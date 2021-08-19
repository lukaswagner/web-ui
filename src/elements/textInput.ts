import { BaseOptions, Handler, ValueInput } from "./base";

type TextType = 'text' | 'color' | 'email' | 'password' | 'url';

export type TextInputOptions = BaseOptions & {
    type?: TextType;
    value?: string;
    handler?: Handler<string>;
}

export class TextInput extends ValueInput<string> {
    protected _input: HTMLInputElement;
    protected _interalHandler: () => void;

    public constructor(
        parent: HTMLElement, id: string, options: TextInputOptions
    ) {
        super(parent, id, options);

        const type = options.type ?? 'text';

        this._value = options.value ?? this.default(type);
        this._handler = options.handler;

        this._input = document.createElement('input');
        this._input.id = this._id;
        this._input.type = type;
        this._input.value = this._value.toString();
        this._interalHandler = () => {
            this._value = this._input.value;
            this._handler(this._value);
        };
        this._input.onchange = this._interalHandler;
        this._container.appendChild(this._input);
    }

    public set value(value: string) {
        super.value = value;
        this._input.value = this._value.toString();
    }

    public get value(): string {
        return super.value;
    }

    protected default(type: TextType): string {
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
}
