"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rowColToKey(row, col) {
    return `${row}/${col}`;
}
class SpreadsheetModel {
    constructor(rowCount, columnCount) {
        this.values = new Map();
        this.rowCount = rowCount;
        this.columnCount = columnCount;
    }
    getValue(row, col) {
        return this.values.get(rowColToKey(row, col));
    }
    setValue(row, col, value) {
        return this.values.set(rowColToKey(row, col), value);
    }
    *iterateEveryCell() {
        for (let col = 0; col < this.columnCount; col++) {
            for (let row = 0; row < this.rowCount; row++) {
                yield {
                    key: rowColToKey(row, col),
                    row,
                    col,
                    value: this.getValue(row, col)
                };
            }
        }
    }
}
exports.default = SpreadsheetModel;
//# sourceMappingURL=SpreadsheetModel.js.map