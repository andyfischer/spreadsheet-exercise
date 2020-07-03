"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SpreadsheetModel_1 = __importDefault(require("./SpreadsheetModel"));
function initializeSpreadsheet() {
    const defaultColumnCount = 4;
    const defaultRowCount = 4;
    const model = new SpreadsheetModel_1.default(defaultColumnCount, defaultRowCount);
    model.setValue(0, 0, "Name");
    model.setValue(0, 1, "Credit");
    model.setValue(0, 2, "Spent");
    model.setValue(0, 3, "Balance");
    model.setValue(1, 0, "Alice");
    model.setValue(1, 1, "10");
    model.setValue(1, 2, "2");
    model.setValue(1, 3, "4");
    model.setValue(2, 0, "Bob");
    model.setValue(2, 1, "5");
    model.setValue(2, 2, "18");
    model.setValue(2, 3, "0");
    model.setValue(3, 0, "Carter");
    model.setValue(3, 1, "4");
    model.setValue(3, 2, "4");
    model.setValue(3, 3, "4");
    return model;
}
exports.default = initializeSpreadsheet;
//# sourceMappingURL=initializeSpreadsheet.js.map