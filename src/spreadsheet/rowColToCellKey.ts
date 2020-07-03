
const char_A = 'A'.charCodeAt(0);

export default function rowColToCellKey(row: number, col: number) {

    // Find the letter for a column.
    // If we go past the letter Z then start using more letters.
    let columnLetter = '';

    while (true) {
        columnLetter = String.fromCharCode(char_A + (col % 26)) + columnLetter;
        if (col < 26)
            break;
        col = Math.floor(col / 26) - 1;
    }

    return columnLetter + (row + 1);
}

// Low budget unit testing
function expectEquals(a,b) {
    if (a !== b)
        throw new Error(`expected ${a} === ${b}`);
}

expectEquals(rowColToCellKey(0,0), 'A1');
expectEquals(rowColToCellKey(1,0), 'A2');
expectEquals(rowColToCellKey(100,0), 'A101');
expectEquals(rowColToCellKey(0,1), 'B1');
expectEquals(rowColToCellKey(3,1), 'B4');
expectEquals(rowColToCellKey(3,25), 'Z4');
expectEquals(rowColToCellKey(3,26), 'AA4');
expectEquals(rowColToCellKey(3,27), 'AB4');
