import React from 'react';
import './SnackGrid.css'

const SnackGrid = (props) => {
  let tableBody = props.grid.slice()
  tableBody = tableBody.map((row, rowIdx) => {
    return (
      <tr key={rowIdx}>
       {
        row.map((cell, colIdx) => {
          return (
            <td 
              key={`${rowIdx}${colIdx}`}
              data-row={rowIdx}
              data-col={colIdx}
              onClick={() => props.snackAttack(rowIdx, colIdx)}
            >
              <div />
            </td>
          );
        })
       }
      </tr>
    );
  });

  return(
    <div>
      <h2>FIND A SNACK</h2>
      <table>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </div>
  );
}

export default SnackGrid;