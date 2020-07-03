"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const initializeSpreadsheet_1 = __importDefault(require("../spreadsheet/initializeSpreadsheet"));
const SpreadsheetView_1 = __importDefault(require("../spreadsheet/SpreadsheetView"));
const layout_1 = __importDefault(require("../components/layout"));
const spreadsheetModel = initializeSpreadsheet_1.default();
const IndexPage = () => (react_1.default.createElement(layout_1.default, null,
    react_1.default.createElement("h1", null, "Spreadsheet demo"),
    react_1.default.createElement(SpreadsheetView_1.default, { model: spreadsheetModel })));
exports.default = IndexPage;
//# sourceMappingURL=index.js.map