import React from "react";
import { FiVolume2 } from "react-icons/fi";
import "./PictogramOptions.css";

function PictogramOptions({ currentPictograms, handleMouseOver, checkAnswer }) {
  return (
    <div className="images">
      {currentPictograms.map((pictogram) => (
        <div key={pictogram.id}>
          <img src={pictogram.url} alt={pictogram.name} onClick={() => checkAnswer(pictogram.name)}/>
          {/*<div className="options-btn">
            <button onClick={() => handleMouseOver(pictogram.name)}>
              <FiVolume2 size={25}/>
            </button>  
      </div>*/ }
        </div>
      ))}
    </div>
  );
}

export default PictogramOptions;