import { BaseOptions, Handler, Input, ValueInput } from "../base";

export type FileInputOptions = BaseOptions & {
    text?: string;
    multiple?: boolean;
    handler?: Handler<FileList>;
}

export class FileInput extends Input<FileList> {
    protected _input: HTMLInputElement;
    protected _button: HTMLButtonElement;
    protected _interalHandler: () => void;

    public constructor(
        parent: HTMLElement, id: string, options: FileInputOptions
    ) {
        super(parent, id, options);

        this._handler = options.handler;

        this._input = document.createElement('input');
        this._input.type = 'file';
        if(options.multiple) this._input.multiple = true;
        this._interalHandler = () => {
            const files = this._input.files;
            console.log(files.length)
            const multiple = files.length > 1 ? ` + ${files.length - 1}` : '';
            this._button.textContent =
                (files.item(0)?.name ?? 'None') + multiple;
            this._handler?.(files);
        };
        this._input.onchange = this._interalHandler;

        this._button = document.createElement('button');
        this._button.id = this._id;
        if(options.text) this._button.textContent = options.text;
        this._button.onclick = () => this._input.click();
        this._container.appendChild(this._button);
    }
}
