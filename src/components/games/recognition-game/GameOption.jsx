import React, { useState } from "react";
import "./GameOptions.css";
import {
  FaArrowCircleLeft,
  FaBookOpen,
  FaCircle,
  FaHome,
  FaQuestion,
  FaStar,
  FaYoutube,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSpeechSynthesis } from "../../../hooks/useSpeechSynthesis";
import { FiVolume2 } from "react-icons/fi";
import PopUpHelp from "../../extras/PopUpHelp";
import PopUpInstructions from "../../extras/PopUpInstructions";

function GameOptions() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isPopUpOpenInstructions, setIsPopUpOpenInstructions] = useState(false);

  const { speak, speaking } = useSpeechSynthesis();
  const navigate = useNavigate();

  const handleImageClick = () => {
    if (!speaking) {
      speak("Elige la dificultad que prefieras.");
    }
  };

  const handleDifficultyClick = (difficulty) => {
    navigate(`/recognition-game/${difficulty}`);
  };

  return (
    <div className="game-config">
      {isPopUpOpen && (
        <PopUpHelp
          onClose={() => {
            setIsPopUpOpen(false);
          }}
          url={"https://www.youtube.com/watch?v=w38IyLM-yo4"}
        />
      )}
      {isPopUpOpenInstructions && (
        <PopUpInstructions
          instructions={"Elige la dificultad que prefieras."}
          url={"public/instructions/difficultyt-message.png"}
          onClose={() => {
            setIsPopUpOpenInstructions(false);
          }}
        />
      )}
      <div className="app-navigation">
        <button
          onClick={() => {
            navigate("/game-menu");
          }}
        >
          <FaArrowCircleLeft />
          <span>Atrás</span>
        </button>
        <button
          onClick={() => {
            navigate("/main-menu");
          }}
        >
          <FaHome />
          <span>Inicio</span>
        </button>
        <h1>Juego de reconocimiento</h1>
        <button
          onClick={() => {
            setIsPopUpOpenInstructions(true);
          }}
        >
          <FaQuestion />
          <span>Indicaciones</span>
        </button>
        <button
          onClick={() => {
            setIsPopUpOpen(true);
          }}
        >
          <FaYoutube />
          <span>Ayuda</span>
        </button>
      </div>
      <div className="config-content">
        <img src="public\instructions\difficultyt-message.png" alt="Imagen de la Aventura" />
        <div className="difficulty-buttons">
          <button onClick={() => handleDifficultyClick("Fácil")}>
            <span>
              <FaStar />
            </span>
            <span className="btn-txt">Fácil</span>
          </button>
          <button onClick={() => handleDifficultyClick("Normal")}>
            <span>
              <FaStar />
              <FaStar />
            </span>
            <span className="btn-txt">Normal</span>
          </button>
          <button onClick={() => handleDifficultyClick("Difícil")}>
            <span>
              <FaStar />
              <FaStar />
              <FaStar />
            </span>
            <span className="btn-txt">Difícil</span>
          </button>
        </div>
      </div>

      <div className="footer-button">
        <button
          onClick={() => {
            handleImageClick();
          }}
        >
          <FiVolume2 />
          <span>Audio</span>
        </button>
      </div>
    </div>
  );
}

export default GameOptions;