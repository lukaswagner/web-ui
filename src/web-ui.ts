import * as i from './elements/input';
import * as o from './elements/output';

import { ElementOptions } from './elements/base';

export class UI {
    protected static _nextId = 0;
    protected _idPrefix = 'ui';
    protected _container: HTMLElement;
    protected _handleOnInit: boolean;

    public constructor(container: HTMLElement, handleOnInit: boolean = false) {
        this._container = container;
        this._handleOnInit = handleOnInit;
    }

    protected create<Type, Options>(
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
        return new type(
            this._container,
            this._idPrefix + UI._nextId++,
            options,
            this._handleOnInit
        );
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
}

export * from './elements/base';
export * from './elements/input';
export * from './elements/output';
