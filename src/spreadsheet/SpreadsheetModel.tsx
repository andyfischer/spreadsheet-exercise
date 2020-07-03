
export interface Cell {
    key: string
    row: number
    col: number
    source: any
    derived: any
}

function rowColToKey(row: number, col: number) {
    return `${row}/${col}`;
}

export default class SpreadsheetModel {
    rowCount: number;
    columnCount: number;
    sourceValues = new Map<string, any>();
    derivedValues = new Map<string, any>();

    constructor(rowCount: number, columnCount: number) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
    }

    getSource(cellkey: string) {
        return this.sourceValues.get(cellkey);
    }

    getDerived(cellkey: string) {
        let derived = this.derivedValues.get(cellkey);
        if (derived != null)
            return derived;

        // Need to compute the derived value.
        const source = this.sourceValues.get(cellkey);

        // TODO: Check if this is an expression

        derived = source;
        this.derivedValues.set(cellkey, derived);
        return derived;
    }

    setRowCol(row: number, col: number, value: any) {
        this.setCell(rowColToKey(row, col), value);
    }

    setCell(cellkey: string, value: any) {
        this.sourceValues.set(cellkey, value);

        // Throw away all derived values every time there is a change.
        // Future: Would be more efficient if we did dependency tracking
        // and only recomputed cells that were affected by this change.
        this.derivedValues = new Map();
    }

    *iterateEveryCell(): Iterable<Cell> {
        for (let col = 0; col < this.columnCount; col++) {
            for (let row = 0; row < this.rowCount; row++) {
                const key = rowColToKey(row, col);
                yield {
                    key,
                    row,
                    col,
                    source: this.getSource(key),
                    derived: this.getDerived(key)
                }
            }
        }
    }
}
