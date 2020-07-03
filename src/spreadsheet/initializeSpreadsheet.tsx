
import SpreadsheetData from './SpreadsheetData'

export default function initializeSpreadsheet() {

    const defaultColumnCount = 4;
    const defaultRowCount = 4;
    const data = new SpreadsheetData(defaultColumnCount, defaultRowCount);
    data.setValue(0, 0, "Name");
    data.setValue(0, 1, "Credit");
    data.setValue(0, 2, "Spent");
    data.setValue(0, 3, "Balance");

    data.setValue(1, 0, "Alice");
    data.setValue(1, 1, "10");
    data.setValue(1, 2, "2");
    data.setValue(1, 3, "4");

    data.setValue(2, 0, "Bob");
    data.setValue(2, 1, "5");
    data.setValue(2, 2, "18");
    data.setValue(2, 3, "0");

    data.setValue(3, 0, "Carter");
    data.setValue(3, 1, "4");
    data.setValue(3, 2, "4");
    data.setValue(3, 3, "4");
    return data;
}
