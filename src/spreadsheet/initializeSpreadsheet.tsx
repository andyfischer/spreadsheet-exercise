
import SpreadsheetModel from './SpreadsheetModel'

export default function initializeSpreadsheet({useLocalStorage}: {useLocalStorage: boolean}) {
    const defaultColumnCount = 4;
    const defaultRowCount = 4;
    const model = new SpreadsheetModel(defaultColumnCount, defaultRowCount);
    model.resetToFakeData();
    model.tryLoadFromLocalStorage();
    model.saveToLocalStorage = true;
    return model;
}
