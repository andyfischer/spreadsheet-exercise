
export interface Cell {
    key: string
    row: number
    col: number
    value: any
}

function rowColToKey(row: number, col: number) {
    return `${row}/${col}`;
}

export default class SpreadsheetModel {
    rowCount: number;
    columnCount: number;
    values = new Map<string, any>();

    constructor(rowCount: number, columnCount: number) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
    }

    getValue(row: number, col: number) {
        return this.values.get(rowColToKey(row, col));
    }

    setRowCol(row: number, col: number, value: any) {
        return this.values.set(rowColToKey(row, col), value);
    }

    setCell(cellkey: string, value: any) {
        this.values.set(cellkey, value);
    }

    *iterateEveryCell(): Iterable<Cell> {
        for (let col = 0; col < this.columnCount; col++) {
            for (let row = 0; row < this.rowCount; row++) {
                yield {
                    key: rowColToKey(row, col),
                    row,
                    col,
                    value: this.getValue(row, col)
                }
            }
        }
    }
}
