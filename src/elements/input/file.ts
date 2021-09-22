import { BaseOptions, Handler, Input } from '../base';

export type FileInputOptions = BaseOptions & {
    text?: string;
    multiple?: boolean;
    handler?: Handler<FileList>;
}

export class FileInput extends Input<FileList> {
    protected _input: HTMLInputElement;
    protected _button: HTMLButtonElement;

    protected setButtonText(): void {
        const files = this._input.files;
        const multiple = files.length > 1 ? ` + ${files.length - 1}` : '';
        this._button.textContent =
            (files.item(0)?.name ?? 'None') + multiple;
    }

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
        this._button.onclick = () => this._input.click();
        this._container.appendChild(this._button);

        // file input does not use defaultHandleOnInit
        if(options.handleOnInit) this._internalHandler?.();
    }

    public reset(): void {
        this._input.value = '';
        this.setButtonText();
    }
}
