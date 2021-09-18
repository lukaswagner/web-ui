import { ArrayInput, ArrayInputOptions } from './elements/input/array';
import { Button, ButtonOptions } from './elements/input/button';
import { CheckboxInput, CheckboxInputOptions } from './elements/input/checkbox';
import { FileInput, FileInputOptions } from './elements/input/file';
import { NumberInput, NumberInputOptions } from './elements/input/number';
import { NumberRangeInput, NumberRangeInputOptions }
    from './elements/input/numberRange';
import { ProgressOutput, ProgressOutputOptions }
    from './elements/output/progress';
import { RangeInput, RangeInputOptions } from './elements/input/range';
import { SelectInput, SelectInputOptions } from './elements/input/select';
import { TableOutput, TableOutputOptions } from './elements/output/table';
import { TextInput, TextInputOptions } from './elements/input/text';
import { TextOutput, TextOutputOptions } from './elements/output/text';
import { BaseOptions } from './elements/base';

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
                options: BaseOptions,
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
        button: (options: ButtonOptions = {}): Button => {
            return this.create<Button, ButtonOptions>(Button, options);
        },
        number: (options: NumberInputOptions = {}): NumberInput => {
            return this.create<NumberInput, NumberInputOptions>(
                NumberInput, options);
        },
        range: (options: RangeInputOptions = {}): RangeInput => {
            return this.create<RangeInput, RangeInputOptions>(
                RangeInput, options);
        },
        numberRange: (
            options: NumberRangeInputOptions = {}
        ): NumberRangeInput => {
            return this.create<NumberRangeInput, NumberRangeInputOptions>(
                NumberRangeInput, options);
        },
        text: (options: TextInputOptions = {}): TextInput => {
            return this.create<TextInput, TextInputOptions>(
                TextInput, options);
        },
        array: (options: ArrayInputOptions = {}): ArrayInput => {
            return this.create<ArrayInput, ArrayInputOptions>(
                ArrayInput, options);
        },
        select: (options: SelectInputOptions = {}): SelectInput => {
            return this.create<SelectInput, SelectInputOptions>(
                SelectInput, options);
        },
        file: (options: FileInputOptions = {}): FileInput => {
            return this.create<FileInput, FileInputOptions>(
                FileInput, options);
        },
        checkbox: (options: CheckboxInputOptions = {}): CheckboxInput => {
            return this.create<CheckboxInput, CheckboxInputOptions>(
                CheckboxInput, options);
        }
    }

    public output = {
        text: (options: TextOutputOptions = {}): TextOutput => {
            return this.create<TextOutput, TextOutputOptions>(
                TextOutput, options);
        },
        progress: (options: ProgressOutputOptions = {}): ProgressOutput => {
            return this.create<ProgressOutput, ProgressOutputOptions>(
                ProgressOutput, options);
        },
        table: (options: TableOutputOptions = {}): TableOutput => {
            return this.create<TableOutput, TableOutputOptions>(
                TableOutput, options);
        }
    }
}
