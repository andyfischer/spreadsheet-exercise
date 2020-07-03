
import React, { useState } from 'react'

import SpreadsheetData, { Cell } from './SpreadsheetData'
import styled from 'styled-components'

interface Props {
    data: SpreadsheetData
}

const Grid = styled.div`
display: grid;

grid-template-columns: repeat(${props => props.columnCount}, 1fr);
grid-template-rows: repeat(${props => props.rowCount}, 1fr);
`

const CellStyle = styled.div`
padding: 10px;
border: 1px solid #ddd;
grid-column: ${props => props.col + 1};
grid-row: ${props => props.row + 1};
`;


function EditingCell({key}) {
    return <input
      key={key}
      type="text" />
}

export default function SpreadsheetView({data}: Props) {

    const [ editingCell, setEditingCell ] = useState(null);

    return <Grid
        rowCount={data.rowCount}
        columnCount={data.columnCount}>

    { Array.from(data.iterateEveryCell()).map((cell: Cell) => {

        if (cell.key === editingCell) {
            // This cell is currently being edited
            return <EditingCell
                key={cell.key}
            />
        }

        return <CellStyle
          key={cell.key}
          row={cell.row}
          col={cell.col}
          onClick={() => {
            if (editingCell)
                setEditingCell(null);
            else
                setEditingCell(cell.key);
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
