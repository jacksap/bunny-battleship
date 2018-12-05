import React from 'react';
import './GardenGrid.css';
import socket from '../../utils/socket';

const GardenGrid = (props) => {
    let gameStart = props.game.gameStatus === 'playMode' ? '' : <button className='PlantButton' onClick={() => socket.emit('veggiePlanting')}>Plant Veggies</button> ;
    let tableBody = props.grid.slice()
    tableBody = tableBody.map((row, rowIdx) => {
      return (
        <tr key={rowIdx}>
         {
          row.map((cell, colIdx) => {
            return (
               <td
                className={props.grid[rowIdx][colIdx].veggie ? `GardenGrid${props.grid[rowIdx][colIdx].veggie}` : 'GardenTD'}
                id={`GardenGrid-dot${cell.harvested ? '-harvested' : ''}${cell.hit ? '-hit' : ''}${cell.miss ? '-miss' : ''}`} 
                key={`${rowIdx}${colIdx}`}
              >
                <div
                />
              </td>
            );
          })
         }
        </tr>
      );
    });
  
    return(
      <div className='GardenGrid'>
        <h2 className="GTHeader">PLANT YOUR VEGGIES</h2>
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