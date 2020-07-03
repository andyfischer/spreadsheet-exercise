
import React, { useState } from 'react'

import SpreadsheetModel, { Cell } from './SpreadsheetModel'
import EditingCell from './EditingCell'
import styled from 'styled-components'

interface Props {
    model: SpreadsheetModel
}

const Grid = styled.div<{rowCount: number, columnCount: number}>`
display: grid;

grid-template-columns: repeat(${props => props.columnCount}, 1fr);
grid-template-rows: repeat(${props => props.rowCount}, 1fr);
`;

const CellStyle = styled.div<{row: number, col: number}>`
padding: 10px;
border: 1px solid #ddd;
grid-column: ${props => props.col + 1};
grid-row: ${props => props.row + 1};
`;

export default function SpreadsheetView({model}: Props) {

    const [ editingCellKey, setEditingCellKey ] = useState<string | null>(null);
    const [ inProgressValue, setInProgressValue ] = useState<string | null>(null);

    function submitCurrentEdit() {
        model.setCell(editingCellKey as string, inProgressValue);
        setInProgressValue(null);
        setEditingCellKey(null);
    }

    return <Grid
        rowCount={model.rowCount}
        columnCount={model.columnCount}>

    { Array.from(model.iterateEveryCell()).map((cell: Cell) => {

        if (cell.key === editingCellKey) {
            // This cell is currently being edited
            return <EditingCell
                cellkey={cell.key}
                value={inProgressValue as string}
                onChange={(val) => setInProgressValue(val)}
                onSubmit={submitCurrentEdit}
            />
        }

        return <CellStyle
          key={cell.key}
          row={cell.row}
          col={cell.col}
          onClick={() => {
            if (editingCellKey) {
                // Already editing a cell, so submit the current edit.
                submitCurrentEdit();
            } else {
                // Start editing this cell
                setEditingCellKey(cell.key);
                setInProgressValue(cell.value);
            }
          }}
        >{cell.value}</CellStyle>
    })}

    </Grid>
}

/*
 Minimal Spreadsheet
# Technical Requirements
- TypeScript
- CSS Grid
We would like to learn more about your approach to solving tasks related to Sites by using similar technologies to ours.
Using as vanilla as approach you're comfortable with, create web app with a usable spreadsheet. Please spend no more than four hours on this task.
### Features
- Arithmetic in cells
- Referencing cells values (e.g. `"=A1 + B2"`)
- Adding additional rows
- Adding additional columns
I believe omitting a library such as React may make this task simpler, but please choose your most comfortable toolset!
### Bonus Features
Entirely optional. Please only complete these if you have additional time:
- Persisting cell values between refreshes
- Reorderable rows

*/
