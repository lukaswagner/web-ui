export abstract class Base {
    protected _id: string;
    protected _container: HTMLDivElement;
    protected _label: HTMLLabelElement;

    public constructor(parent: HTMLElement, id: string) {
        this._id = id;

        this._container = document.createElement('div');
        this._label = document.createElement('label');
        this._label.htmlFor = this._id;
        this._container.appendChild(this._label);

        parent.appendChild(this._container);
    }
}

type Handler<T> = (value: T) => void;

export interface IInput<T> {
    set handler(handler: Handler<T>);
}

export interface IValue<T> {
    set value(value: T);
    get value(): T;
}

export class Input<T> extends Base implements IInput<T> {
    protected _handler: Handler<T>;

    public set handler(handler: Handler<T>) {
        this._handler = handler;
    }
}

export class Value<T> extends Base implements IValue<T> {
    protected _value: T;

    public set value(value: T) {
        this._value = value;
    }

    public get value(): T {
        return this._value;
    }
}

export class ValueInput<T> extends Base implements IValue<T>, IInput<T> {
    protected _value: T;
    protected _handler: Handler<T>;

    public set value(value: T) {
        this._value = value;
    }

    public get value(): T {
        return this._value;
    }

    public set handler(handler: Handler<T>) {
        this._handler = handler;
    }
}
