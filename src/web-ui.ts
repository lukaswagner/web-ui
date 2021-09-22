import * as i from './elements/input';
import * as o from './elements/output';

import { Element, ElementOptions } from './elements/base';

export class UI {
    protected static _nextId = 0;
    protected _idPrefix = 'ui';
    protected _container: HTMLElement;
    protected _handleOnInit: boolean;
    protected _elements = new Map<string, Element>();

    public constructor(container: HTMLElement, handleOnInit = false) {
        this._container = container;
        this._handleOnInit = handleOnInit;
    }

    protected create<Type extends Element, Options extends ElementOptions>(
        type: {
            new(
                parent: HTMLElement,
                id: string,
                options: ElementOptions,
                defaultHandleOnInit: boolean
            ): Type;
        },
        options: Options
    ): Type {
        const id = options.id ?? this._idPrefix + UI._nextId++;
        const element = new type(
            this._container,
            id,
            options,
            this._handleOnInit
        );
        this._elements.set(id, element);
        return element;
    }

    public input = {
        button: (options: i.ButtonOptions = {}): i.Button => {
            return this.create<i.Button, i.ButtonOptions>(i.Button, options);
        },
        number: (options: i.NumberInputOptions = {}): i.NumberInput => {
            return this.create<i.NumberInput, i.NumberInputOptions>(
                i.NumberInput, options);
        },
        range: (options: i.RangeInputOptions = {}): i.RangeInput => {
            return this.create<i.RangeInput, i.RangeInputOptions>(
                i.RangeInput, options);
        },
        numberRange: (
            options: i.NumberRangeInputOptions = {}
        ): i.NumberRangeInput => {
            return this.create<i.NumberRangeInput, i.NumberRangeInputOptions>(
                i.NumberRangeInput, options);
        },
        text: (options: i.TextInputOptions = {}): i.TextInput => {
            return this.create<i.TextInput, i.TextInputOptions>(
                i.TextInput, options);
        },
        array: (options: i.ArrayInputOptions = {}): i.ArrayInput => {
            return this.create<i.ArrayInput, i.ArrayInputOptions>(
                i.ArrayInput, options);
        },
        select: (options: i.SelectInputOptions = {}): i.SelectInput => {
            return this.create<i.SelectInput, i.SelectInputOptions>(
                i.SelectInput, options);
        },
        file: (options: i.FileInputOptions = {}): i.FileInput => {
            return this.create<i.FileInput, i.FileInputOptions>(
                i.FileInput, options);
        },
        checkbox: (options: i.CheckboxInputOptions = {}): i.CheckboxInput => {
            return this.create<i.CheckboxInput, i.CheckboxInputOptions>(
                i.CheckboxInput, options);
        }
    }

    public output = {
        text: (options: o.TextOutputOptions = {}): o.TextOutput => {
            return this.create<o.TextOutput, o.TextOutputOptions>(
                o.TextOutput, options);
        },
        progress: (options: o.ProgressOutputOptions = {}): o.ProgressOutput => {
            return this.create<o.ProgressOutput, o.ProgressOutputOptions>(
                o.ProgressOutput, options);
        },
        table: (options: o.TableOutputOptions = {}): o.TableOutput => {
            return this.create<o.TableOutput, o.TableOutputOptions>(
                o.TableOutput, options);
        }
    }

    public get elements(): Map<string, Element> {
        return this._elements;
    }

    public reset(invokeHandler = false): void {
        for (const element of this._elements.values()) {
            element.reset(invokeHandler);
        }
    }

    public setFromObject(
        preset: Record<string, unknown>, invokeHandler = false
    ): void {
        for (const key in preset) {
            if (!this.elements.has(key)) continue;
            this.elements.get(key).setFromObject(preset[key], invokeHandler);
        }
    }
}

export * from './elements/base';
export * from './elements/input';
export * from './elements/output';
