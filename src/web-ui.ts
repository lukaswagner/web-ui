import { v4 as uuid } from 'uuid';

import templates from './templates';

export class UI {
    protected _container: HTMLElement;
    protected _inputSlider = templates.InputSlider;

    public constructor(container: HTMLElement) {
        this._container = container;
    }

    public inputSlider(name: string) {
        const id = uuid();
        const node = this._inputSlider.cloneNode(true) as HTMLDivElement;
        const label = node.querySelector('label');
        label.textContent = name;
        label.htmlFor = id;
        node.querySelector('input').id = id;
        this._container.appendChild(node);
    }
}
