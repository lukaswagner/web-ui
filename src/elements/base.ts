export type ElementOptions = {
    id?: string;
    label?: string;
    handleOnInit?: boolean;
}

export abstract class Element {
    protected _id: string;
    protected _container: HTMLDivElement;
    protected _label: HTMLLabelElement;

    // @internal
    public constructor(
        parent: HTMLElement, id: string, options: ElementOptions
    ) {
        if (parent === undefined && id === undefined && options === undefined) {
            throw new Error('Do not instantiate UI elements manually.');
        }

        this._id = id;

        this._container = document.createElement('div');
        this._label = document.createElement('label');
        this._label.htmlFor = this._id;
        this._label.textContent = options.label ?? '';
        this._container.appendChild(this._label);

        parent.appendChild(this._container);
    }

    public abstract reset(invokeHandler?: boolean): void;
}

export type Handler<T> = (value: T) => void;

export interface IInput<T> {
    set handler(handler: Handler<T>);
}

export interface IValue<T> {
    set value(value: T);
    get value(): T;
}

export abstract class Input<T> extends Element implements IInput<T> {
    protected _handler: Handler<T>;
    protected _internalHandler: () => void;

    public set handler(handler: Handler<T>) {
        this._handler = handler;
    }

    public abstract override reset(invokeHandler?: boolean): void;
}

export class Value<T> extends Element implements IValue<T> {
    protected _value: T;
    protected _default: T;

    public set value(value: T) {
        this._value = value;
    }

    public get value(): T {
        return this._value;
    }

    public reset(): void {
        this.value = this._default;
    }
}

export class ValueInput<T, U = T>
    extends Element implements IValue<T>, IInput<U> {
    protected _value: T;
    protected _default: T;
    protected _handler: Handler<U>;
    protected _internalHandler: () => void;

    public set value(value: T) {
        this._value = value;
    }

    public get value(): T {
        return this._value;
    }

    public set handler(handler: Handler<U>) {
        this._handler = handler;
    }

    public override reset(invokeHandler?: boolean): void {
        this.value = this._default;
        if (invokeHandler) this._internalHandler?.();
    }
}
