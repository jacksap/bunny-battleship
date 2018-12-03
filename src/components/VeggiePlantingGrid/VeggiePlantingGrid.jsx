import React from 'react';
import './VeggiePlantingGrid.css';

const VeggiePlantingGrid = (props) => {
  let veggiesToPlant = [];
  for (let veggie in props.veggies) {
    if (!props.plantedVeggies.includes(veggie)) {
      veggiesToPlant.push(veggie);
    }
  }
  veggiesToPlant = veggiesToPlant.map((veggie, idx) => {
      return (
        <div 
          key={idx}  
          onClick={() => props.handleVeggiePlanting(veggie)} 
        >
          {veggie}
        </div>
      )
    });

  return (
    veggiesToPlant.length > 0 ? 
      <div>
        <h5>Veggies</h5>
        <div>
          {veggiesToPlant}
        </div>
        <div>
          <h6>Orientation | {props.orientation.toUpperCase()}</h6>
        </div>
        <div>
          <div>
            <button onClick={() => props.handleOrientationChange()}>Rotate veggie</button>
          </div>
        </div>
      </div>
      :
      <div>
        <h5>Ready to snack? Other player isn't...</h5>
      </div>
  );
}

export default VeggiePlantingGrid;