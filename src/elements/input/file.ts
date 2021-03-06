import { ElementOptions, Handler, ValueInput } from '../base';

export type FileInputOptions = ElementOptions & {
    text?: string;
    multiple?: boolean;
    handler?: Handler<FileList>;
}

export class FileInput extends ValueInput<FileList> {
    protected _input: HTMLInputElement;
    protected _button: HTMLButtonElement;

    public override get value(): FileList {
        return this._input.files;
    }

    public override set value(f: FileList) {
        this._input.files = f;
    }

    protected setButtonText(): void {
        const files = this._input.files;
        const multiple = files.length > 1 ? ` + ${files.length - 1}` : '';
        this._button.textContent =
            (files.item(0)?.name ?? 'None') + multiple;
    }

    // @internal
    public constructor(
        parent: HTMLElement, id: string, options: FileInputOptions
    ) {
        super(parent, id, options);

        this._handler = options.handler;

        this._input = document.createElement('input');
        this._input.type = 'file';
        if (options.multiple) this._input.multiple = true;
        this._internalHandler = () => {
            const files = this._input.files;
            this.setButtonText();
            this._handler?.(files);
        };
        this._input.onchange = this._internalHandler;

        this._button = document.createElement('button');
        this._button.id = this._id;
        if (options.text) this._button.textContent = options.text;
        this._button.type = 'button';
        this._button.onclick = () => this._input.click();
        this._container.appendChild(this._button);

        // file input does not use defaultHandleOnInit
        if (options.handleOnInit) this._internalHandler?.();
    }

    public override reset(): void {
        this._input.value = '';
        this.setButtonText();
    }

    public invokeHandler(): void {
        const files = this._input.files;
        this._handler?.(files);
    }

    public override setFromObject(): void { }

    public get elements(): [HTMLInputElement, HTMLButtonElement] {
        return [this._input, this._button];
    }
}
