"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const EditingCell_1 = __importDefault(require("./EditingCell"));
const styled_components_1 = __importDefault(require("styled-components"));
const Grid = styled_components_1.default.div `
display: grid;

grid-template-columns: repeat(${props => props.columnCount}, 1fr);
grid-template-rows: repeat(${props => props.rowCount}, 1fr);
`;
const CellStyle = styled_components_1.default.div `
padding: 10px;
border: 1px solid #ddd;
grid-column: ${props => props.col + 1};
grid-row: ${props => props.row + 1};
`;
function SpreadsheetView({ model }) {
    const [editingCell, setEditingCell] = react_1.useState(null);
    return react_1.default.createElement(Grid, { rowCount: model.rowCount, columnCount: model.columnCount }, Array.from(model.iterateEveryCell()).map((cell) => {
        if (cell.key === editingCell) {
            return react_1.default.createElement(EditingCell_1.default, { key: cell.key });
        }
        return react_1.default.createElement(CellStyle, { key: cell.key, row: cell.row, col: cell.col, onClick: () => {
                if (editingCell)
                    setEditingCell(null);
                else
                    setEditingCell(cell.key);
            } }, cell.value);
    }));
}
exports.default = SpreadsheetView;
//# sourceMappingURL=SpreadsheetView.js.map