import { Button, ButtonOptions } from "./elements/Button";

export class UI {
    protected static _nextId = 0;
    protected _idPrefix = 'ui';
    protected _container: HTMLElement;

    public constructor(container: HTMLElement) {
        this._container = container;
    }

    public button(options: ButtonOptions = {}): Button {
        return new Button(
            this._container,
            this._idPrefix + UI._nextId++,
            options
        );
    }
}
