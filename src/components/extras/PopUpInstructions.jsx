import React from "react";
import "./PopUpInstructions.css";
import { FaTimes } from "react-icons/fa";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";
import { FiVolume2 } from "react-icons/fi";

function PopUpInstructions({ instructions, url, onClose }) {
  const { speak, speaking } = useSpeechSynthesis();

  const handleSpeechClick = () => {
    if (!speaking) {
      var text = instructions;
      speak(text);
    }
  };

  return (
    <div className="popup-instructions">
      <div className="popup-content-instructions">
        <div className="close-instructions">
          <div className="contenedor-titulo-instructions">
            <h2 className="titulo-instructions">Indicaciones:</h2>
          </div>
          <button className="close-button-instructions" onClick={onClose}>
            <FaTimes />
            <span>Cerrar</span>
          </button>
        </div>

        <div>
          {/*<h3 className="subtitulo-instructions">
            {instructions}
  </h3>*/}
          <img
            src={url}
            alt="Imagen de instrucciones"
            className="img-instructions"
          />
        </div>
        <div className="footer-button">
          <button
            onClick={() => {
              handleSpeechClick();
            }}
          >
            <FiVolume2 />
            <span>Audio</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUpInstructions;
