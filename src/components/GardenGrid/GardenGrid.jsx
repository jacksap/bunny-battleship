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
                onClick={props.snackAttempt}
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
        <table className='GardenTable'>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default GardenGrid;