// PopUp.js
import React from "react";
import "./PopUp.css";
import { FaArrowUp, FaRedo, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { FiVolume2 } from "react-icons/fi";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";
import { useNavigate } from "react-router-dom";

function PopUp({
  message,
  onClose,
  handleContinue,
  handleFinish,
  handleUpgradeDifficulty,
  difficulty,
  lose
}) {
  const navigate = useNavigate();
  const { speak, speaking } = useSpeechSynthesis();

  const handleImageClick = () => {
    if (!speaking) {
      speak(message);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="close">
          {/*<button className="close-button" onClick={onClose}>
            <FaTimes />
  </button>*/}
        </div>
        {/*<p>{message}</p>*/}
        <div className="popup-img-btn">
          {lose ? (
            <img
              src="/public/instructions/lose-message.png"
              alt="Perdiste"
              onClick={handleImageClick}
            />
          ) : 
          (
            <img
              src="/public/instructions/win-message.png"
              alt="Ganaste"
              onClick={handleImageClick}
            />
          )
          }
          <div className="popup-btns">
            {!lose ? (
              <>
                <button onClick={handleContinue}> <FaRedo/> Seguir jugando</button>
                
                {difficulty !== "Difícil" && lose !== true ? (
                  <button onClick={handleUpgradeDifficulty}>
                    <FaArrowUp/>  Subir Dificultad
                  </button>
                ) : null}
                <button onClick={handleFinish}> <FaSignOutAlt/> Salir al menú</button>
              </>
            ) : (
              <>
                <button onClick={onClose}> <FaRedo/> Intentar de nuevo</button>
                <button onClick={handleFinish}> <FaSignOutAlt/> Salir al menú</button>
              </>
            )}
          </div>
        </div>
        <div className="footer-button">
          <button onClick={handleImageClick}>
            <FiVolume2 />
            <span>Audio</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
