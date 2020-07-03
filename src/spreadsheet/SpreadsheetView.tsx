
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

input {
width: 100%;
height: 100%;
}
`;

export default function SpreadsheetView({model}: Props) {

    // State used when a cell is being edited.
    const [ editingCellKey, setEditingCellKey ] = useState<string | null>(null);
    const [ inProgressValue, setInProgressValue ] = useState<string | null>(null);

    // State to help trigger re-renders when the SpreadsheetModel changes.
    const [ modelVer, setModelVer ] = useState(1);

    function submitCurrentEdit() {
        model.setCell(editingCellKey as string, inProgressValue);
        setInProgressValue(null);
        setEditingCellKey(null);
        setModelVer(modelVer + 1);
    }

    return <Grid
        rowCount={model.rowCount || 0}
        columnCount={model.columnCount || 0}>

        <CellStyle
            row={0}
            col={ model.columnCount }
            onClick={() => {
                model.addColumn();
                setModelVer(modelVer + 1);
            }}
        >Add Column</CellStyle>

        <CellStyle
            row={ model.rowCount }
            col={0}
            onClick={() => {
                model.addRow();
                setModelVer(modelVer + 1);
            }}
        >Add Row</CellStyle>

    { Array.from(model.iterateEveryCell()).map((cell: Cell) => {

        let contents;

        if (cell.key === editingCellKey) {
            // This cell is currently being edited
            contents = <EditingCell
                key={cell.key}
                value={inProgressValue as string}
                onChange={(val) => setInProgressValue(val)}
                onSubmit={submitCurrentEdit}
            />
        } else {
            contents = cell.derived;
        }

        return <CellStyle
          key={cell.key}
          row={cell.row}
          col={cell.col}
          onClick={() => {
            if (editingCellKey) {
                // Already editing a cell, so submit it and stop editing.
                submitCurrentEdit();
            } else {
                // Start editing this cell
                setEditingCellKey(cell.key);
                setInProgressValue(cell.source);
            }
          }}
        >{contents}</CellStyle>
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
