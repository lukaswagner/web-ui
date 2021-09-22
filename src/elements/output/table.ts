import { ElementOptions, Value } from '../base';

interface Printable {
    toString(): string
}

type Row = Printable[];

export type TableOutputOptions = ElementOptions & {
    head?: Row;
    value?: Row[];
}

export class TableOutput extends Value<Row[]> {
    protected _head: Row;
    protected _output: HTMLTableElement;

    // @internal
    public constructor(
        parent: HTMLElement, id: string, options: TableOutputOptions
    ) {
        super(parent, id, options);

        this._value = options.value ?? [];
        this._default = this._value.map((r) => r.slice());
        this._head = options.head;

        this._output = document.createElement('table');
        this._output.id = this._id;
        this.buildTable();
        this.buildHead();
        this._container.appendChild(this._output);
    }

    public override set value(value: Row[]) {
        super.value = value ?? [];
        this.clean();
        this.buildTable();
        this.buildHead();
    }

    public override get value(): Row[] {
        return super.value;
    }

    public setRow(index: number, value: Row): void {
        this._value[index] = value;

        const oldRow = this._output.children.item(index + this.headOffset());
        const newRow = this.buildRow(value);
        if (oldRow) {
            this._output.replaceChild(newRow, oldRow);
        } else {
            this._output.appendChild(newRow);
        }
    }

    public setCell(
        rowIndex: number, cellIndex: number, value: Printable
    ): void {
        const row = this._value[rowIndex] ?? [];
        row[cellIndex] = value;
        this._value[rowIndex] = row;

        const oldRow = this._output.children.item(rowIndex + this.headOffset());
        if (oldRow) {
            const oldCell = oldRow.children.item(cellIndex);
            const newCell = this.buildCell(value);
            if (oldCell) {
                oldRow.replaceChild(newCell, oldCell);
            } else {
                oldRow.appendChild(newCell);
            }
        } else {
            this._output.appendChild(this.buildRow([value]));
        }
    }

    protected clean(): void {
        const clone = this._output.cloneNode(false) as HTMLTableElement;
        this._output.parentNode.replaceChild(clone, this._output);
        this._output = clone;
    }

    protected buildTable(): void {
        this._value.forEach((r) => {
            this._output.appendChild(this.buildRow(r));
        });
    }

    protected buildRow(r: Row): HTMLTableRowElement {
        const row = document.createElement('tr');
        r.forEach((c) => {
            row.appendChild(this.buildCell(c));
        });
        return row;
    }

    protected buildCell(c: Printable): HTMLTableCellElement {
        const cell = document.createElement('td');
        cell.textContent = c.toString();
        return cell;
    }

    protected buildHead(): void {
        if (this._head) {
            this._output.insertBefore(
                this.buildRow(this._head),
                this._output.firstChild);
        }
    }

    protected headOffset(): number {
        return this._head ? 1 : 0;
    }

    public override reset(): void {
        this.value = this._default.map((r) => r.slice());
    }
}
