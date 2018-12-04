import React from 'react';
import './GardenGrid.css';

const GardenGrid = (props) => {
    let gameStart = !props.gameStatus ? <button onClick={props.veggiePlanting}>Plant Veggies</button> : <p>Good Luck</p>;
    let tableBody = props.grid.slice()
    tableBody = tableBody.map((row, rowIdx) => {
      return (
        <tr key={rowIdx}>
         {
          row.map((cell, colIdx) => {
            return (
               <td 
                key={`${rowIdx}${colIdx}`}
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
        {gameStart}
      </div>
    );
  }
  
  export default GardenGrid;