import React from 'react';
import './GardenGrid.css';

const GardenGrid = (props) => {

    let tableBody = props.grid.slice()
    tableBody = tableBody.map((row, rowIdx) => {
      return (
        <tr key={rowIdx}>
         {
          row.map((cell, colIdx) => {
            return (
               <td 
                key={`${rowIdx}${colIdx}`}
                className={`GardenGrid-cell${cell.hover ? ' GardenGrid-hover' : ''}${cell.veggie ? ' GardenGrid-veggie' : ''}`}
                onClick={props.handleVeggiePlanting ? () => props.handleVeggiePlanting(props.selectedVeggie, props.orientation, rowIdx, colIdx) : null}
                onMouseEnter={props.handleVeggiePlanting ? () => props.handleGardenGridCellHover(rowIdx, colIdx) : null }
                onMouseLeave={props.handleVeggiePlanting ? () => props.handleGardenGridCellLeaveHover(rowIdx, colIdx) : null }
              >
                <div className={`GardenGrid-dot${cell.harvested ? ' GardenGrid-harvested' : ''}${cell.hit ? ' GardenGrid-hit' : ''}${cell.miss ? ' GardenGrid-miss' : ''}`} />
              </td>
            );
          })
         }
        </tr>
      );
    });
  
    return(
      <div>
        <h2>PLANT YOUR VEGGIES</h2>
        <table>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default GardenGrid;