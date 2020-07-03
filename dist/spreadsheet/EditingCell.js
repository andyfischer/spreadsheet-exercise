"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function EditingCell({ key }) {
    return react_1.default.createElement("input", { key: key, type: "text" });
}
exports.default = EditingCell;
//# sourceMappingURL=EditingCell.js.map