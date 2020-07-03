
const char_space = ' '.charCodeAt(0);
const char_a = 'a'.charCodeAt(0);
const char_z = 'z'.charCodeAt(0);
const char_A = 'A'.charCodeAt(0);
const char_Z = 'Z'.charCodeAt(0);
const char_0 = '0'.charCodeAt(0);
const char_9 = '9'.charCodeAt(0);

export type AST = Ref | Literal | Error | Expression

export interface Ref {
    type: 'ref'
    ref: string
}

export interface Literal {
    type: 'literal'
    literal: string
}

export interface Error {
    type: 'error'
}

export interface Expression {
    type: 'expression'
    callback: (a: any, b: any) => any
    left: AST
    right: AST
}

class Parser {
    str: string
    charIndex: number = 0

    constructor(str: string) {
        this.str = str;
    }

    advance() {
        this.charIndex++;
    }

    skipSpaces() {
        while (this.isSpace())
            this.advance();
    }

    finished() {
        return this.charIndex >= this.str.length;
    }

    next() {
        if (this.finished())
            return '';
        return this.str[this.charIndex];
    }

    nextChar() {
        if (this.finished())
            return 0;
        return this.str.charCodeAt(this.charIndex);
    }

    validStartingCellKey() {
        const c = this.nextChar();

        return ((c >= char_a && c <= char_z)
                || (c >= char_A && c <= char_Z));
    }

    validInsideCellKey() {
        const c = this.nextChar();

        return ((c >= char_a && c <= char_z)
                || (c >= char_A && c <= char_Z)
                || (c >= char_0 && c <= char_9));
    }

    isNumber() {
        const c = this.nextChar();
        return (c >= char_0 && c <= char_9);
    }

    isSpace() {
        const c = this.nextChar();
        return c === char_space;
    }
}

function parseAtom(parser: Parser): AST | null {

    while (parser.isSpace())
        parser.advance();

    if (parser.finished())
        return null;

    if (parser.validStartingCellKey()) {
        // Parse a cell ref
        let ref = '';
        while (parser.validInsideCellKey()) {
            ref += parser.next();
            parser.advance();
        }

        const result: Ref = {
            type: 'ref',
            ref
        }

        return result;
    }

    if (parser.isNumber()) {
        // Parse a literal number
        let numberStr = '';

        while (parser.isNumber()) {
            numberStr += parser.next();
            parser.advance();
        }

        const result: Literal = {
            type: 'literal',
            literal: numberStr
        }

        return result;
    }

    return null;
}

function parseFoundExpression(parser: Parser, left: AST, callback): AST {
    // skip over the operator we just found
    parser.advance();

    const right = parseInfixExpression(parser);
    if (!right) {
        return {
            type: 'error'
        }
    }

    const expr: Expression = {
        type: 'expression',
        callback,
        left,
        right
    }

    return expr;
}

function parseInfixExpression(parser: Parser): AST | null {
    parser.skipSpaces();
    let result = parseAtom(parser);
    if (!result)
        return null;

    parser.skipSpaces();

    const next = parser.next();

    switch (next) {
    case '+':
        result = parseFoundExpression(parser, result, (a,b) => a + b);
        break;
    case '-':
        result = parseFoundExpression(parser, result, (a,b) => a - b);
        break;
    case '*':
        result = parseFoundExpression(parser, result, (a,b) => a * b);
        break;
    case '/':
        result = parseFoundExpression(parser, result, (a,b) => a / b);
        break;
    }

    return result;
}

export default function parseExpression(str: string): AST | null {
    const parser = new Parser(str);
    return parseInfixExpression(parser);
}

// Low budget unit testing
function expectEquals(a,b) {
    if (a !== b)
        throw new Error(`expected ${a} === ${b}`);
}

expectEquals(JSON.stringify(parseExpression('A1')), '{"type":"ref","ref":"A1"}');
expectEquals(JSON.stringify(parseExpression('1')), '{"type":"literal","literal":"1"}');
expectEquals(JSON.stringify(parseExpression('A1 + 1')), '{"type":"expression","left":{"type":"ref","ref":"A1"},"right":{"type":"literal","literal":"1"}}');
