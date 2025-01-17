import React from "react";
import "./PopUpHelp.css";
import { FaTimes } from "react-icons/fa";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";
import { FiVolume2 } from "react-icons/fi";

function PopUpHelp({ url, onClose }) {
  const videoId = url.split("v=")[1];
  const { speak, speaking } = useSpeechSynthesis();

  const handleImageClick = () => {
    if (!speaking) {
      // Utiliza el hook para hablar
      speak(
        "En el siguiente video tutorial se mostrará como realizar la actividad:"
      );
    }
  };

  return (
    <div className="popup-help">
      <div className="popup-content-help">
      <div className="close-help">
  <div className="contenedor-titulo">
    <h2 className="titulo">Ayuda</h2>
  </div>
  
  <button className="close-button-help" onClick={onClose}>
    <FaTimes />
    <span>Cerrar</span>
  </button>
</div>

        <div className="video-container-help">
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        {/*<div className="footer-button">
        <button
          onClick={() => {
            handleImageClick();
          }}
        >
          <FiVolume2 />
          <span>Audio</span>
        </button>
        </div>*/}
      </div>
    </div>
  );
}

export default PopUpHelp;
