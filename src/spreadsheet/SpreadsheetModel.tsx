
import rowColToCellKey from './rowColToCellKey'
import parseExpression, { AST, Literal, Ref, Expression } from './parseExpression'
import initFakeData from './initFakeData'

export interface Cell {
    key: string
    row: number
    col: number
    source: any
    derived: any
}

export default class SpreadsheetModel {
    rowCount: number;
    columnCount: number;
    
    // Source values, including expressions like "=A1 + A2"
    sourceValues = new Map<string, any>();

    // Derived values, where expressions are resolved to actual numbers.
    derivedValues = new Map<string, any>();

    // Whether to save to localStorage
    saveToLocalStorage = false

    constructor(rowCount: number, columnCount: number) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
    }

    reset() {
        this.sourceValues = new Map();
        this.derivedValues = new Map();
        this.afterChange();
    }

    resetToFakeData() {
        this.reset();
        initFakeData(this);
        this.afterChange();
    }

    getSource(cellkey: string) {
        return this.sourceValues.get(cellkey);
    }

    evaluateExpression(ast: AST) {
        switch (ast.type) {
            case 'literal':
                return parseInt(ast.literal, 10);

            case 'ref':
                return this.getDerived(ast.ref);

            case 'expression': {
                const left = this.evaluateExpression(ast.left);
                const right = this.evaluateExpression(ast.right);
                
                if (left === '#error' || right === '#error')
                    return '#error'
                const result = ast.callback(parseInt(left, 10), parseInt(right, 10));
                if (!isFinite(result))
                    return '#error'
                return result;
            }

            case 'error':
                return '#error'
        }

        console.error('unhandled AST node: ', ast);
        return '#error';
    }

    getDerived(cellkey: string) {
        let derived: string | null = this.derivedValues.get(cellkey);
        if (derived != null)
            return derived;

        // Need to compute the derived value.
        const source = this.sourceValues.get(cellkey);

        // Check if this is an expression
        if (source != null && source[0] === '=') {
            const expr = parseExpression(source.slice(1));
            if (expr)
                derived = this.evaluateExpression(expr);
        } else {
            derived = source;
        }

        this.derivedValues.set(cellkey, derived);
        return derived;
    }

    setRowCol(row: number, col: number, value: any) {
        this.setCell(rowColToCellKey(row, col), value);
    }

    setCell(cellkey: string, value: any) {
        this.sourceValues.set(cellkey, value);

        // Throw away all derived values every time there is a change.
        // Future: Would be more efficient if we did dependency tracking
        // and only recomputed cells that were affected by this change.
        this.derivedValues = new Map();

        this.afterChange();
    }

    *iterateEveryCell(): Iterable<Cell> {
        for (let col = 0; col < this.columnCount; col++) {
            for (let row = 0; row < this.rowCount; row++) {
                const key = rowColToCellKey(row, col);
                yield {
                    key,
                    row,
                    col,
                    source: this.getSource(key),
                    derived: this.getDerived(key)
                }
            }
        }
    }

    addColumn() {
        this.columnCount += 1;
        this.afterChange();
    }

    addRow() {
        this.rowCount += 1;
        this.afterChange();
    }

    tryLoadFromLocalStorage(): boolean {
        try {
            const saved = window.localStorage.savedSpreadsheet;
            if (!saved)
                return false;

            const savedData = JSON.parse(saved);
            this.reset();
            this.rowCount = savedData.rowCount;
            this.columnCount = savedData.columnCount;
            for (const cell of savedData.cells) {
                this.setCell(cell.key, cell.source);
            }

            console.log('Loaded from localStorage', this);

            return true;

        } catch (e) {
            console.error(e);
            return false;
        }
    }
    
    afterChange() {
        if (this.saveToLocalStorage) {
            try {
                window.localStorage.savedSpreadsheet = JSON.stringify({
                    columnCount: this.columnCount,
                    rowCount: this.rowCount,
                    cells: Array.from(this.iterateEveryCell())
                });
            } catch (e) {
                console.error(e);
            }
        }
    }
}

// Low budget unit testing
function expectEquals(a,b) {
    if (a !== b)
        throw new Error(`expected ${a} === ${b}`);
}

const testModel = new SpreadsheetModel(1, 3);
testModel.setCell('A1', 2);
testModel.setCell('A2', 3);
testModel.setCell('A3', '=A1 + A2');
console.log('result: ', testModel.getDerived('A3'))
expectEquals(testModel.getDerived('A3'), 5);
