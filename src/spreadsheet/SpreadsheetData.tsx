
export default class SpreadsheetData {
    columnCount: number;
    rowCount: number;
    cells = new Map<string, any>();

    constructor(columnCount, rowCount) {
        this.columnCount = columnCount;
        this.rowCount = rowCount;
    }
}
