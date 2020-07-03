
import rowColToCellKey from './rowColToCellKey'
import parseExpression, { AST, Literal, Ref, Expression } from './parseExpression'

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
    sourceValues = new Map<string, any>();
    derivedValues = new Map<string, any>();

    constructor(rowCount: number, columnCount: number) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
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
                const left = parseInt(this.evaluateExpression(ast.left), 10);
                const right = parseInt(this.evaluateExpression(ast.right), 10);
                if (left === '#error' || right === '#error')
                    return '#error'
                const result = ast.callback(left, right);
                if (!isFinite(result))
                    return '#error'
                return result;
            }

            case 'error':
                return '#error'
        }

        console.log('unhandled AST node: ', ast);
        return '#error';
    }

    getDerived(cellkey: string) {
        let derived = this.derivedValues.get(cellkey);
        if (derived != null)
            return derived;

        // Need to compute the derived value.
        const source = this.sourceValues.get(cellkey);

        // Check if this is an expression
        if (source != null && source[0] === '=') {
            const expr = parseExpression(source.slice(1));
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
}

// Low budget unit testing
function expectEquals(a,b) {
    if (a !== b)
        throw new Error(`expected ${a} === ${b}`);
}

const testModel = new SpreadsheetModel();
testModel.setCell('A1', 2);
testModel.setCell('A2', 3);
testModel.setCell('A3', '=A1 + A2');
console.log('result: ', testModel.getDerived('A3'))
expectEquals(testModel.getDerived('A3'), 5);
