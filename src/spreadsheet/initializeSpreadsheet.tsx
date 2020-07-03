
import SpreadsheetModel from './SpreadsheetModel'

export default function initializeSpreadsheet({useLocalStorage}: {useLocalStorage: boolean}) {

    const defaultColumnCount = 4;
    const defaultRowCount = 4;
    const model = new SpreadsheetModel(defaultColumnCount, defaultRowCount);

    if (useLocalStorage && !model.tryLoadFromLocalStorage()) {

        model.setRowCol(0, 0, "Name");
        model.setRowCol(0, 1, "Credit");
        model.setRowCol(0, 2, "Spent");
        model.setRowCol(0, 3, "Balance (computed)");

        model.setRowCol(1, 0, "Alice");
        model.setRowCol(1, 1, "10");
        model.setRowCol(1, 2, "2");
        model.setRowCol(1, 3, "=B2 - C2");

        model.setRowCol(2, 0, "Bob");
        model.setRowCol(2, 1, "5");
        model.setRowCol(2, 2, "18");
        model.setRowCol(2, 3, "=B3 - C3");

        model.setRowCol(3, 0, "Carter");
        model.setRowCol(3, 1, "4");
        model.setRowCol(3, 2, "4");
        model.setRowCol(3, 3, "=B4 - C4");
    }

    model.saveToLocalStorage = true;
    return model;
}
