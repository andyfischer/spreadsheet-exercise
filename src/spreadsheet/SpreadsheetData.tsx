
export interface Cell {
    row: number
    col: number
    value: any
}

export default class SpreadsheetData {
    rowCount: number;
    columnCount: number;
    values = new Map<string, any>();

    constructor(rowCount, columnCount) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
    }

    getValue(row: number, col: number, ) {
        const key = `${row}/${col}`
        return this.values.get(key);
    }

    setValue(row: number, col: number, value: any) {
        const key = `${row}/${col}`
        return this.values.set(key, value);
    }

    *iterateEveryCell(): Iterable<Cell> {
        for (let col = 0; col < this.columnCount; col++) {
            for (let row = 0; row < this.rowCount; row++) {
                yield {
                    row,
                    col,
                    value: this.getValue(row, col)
                }
            }
        }
    }
}
