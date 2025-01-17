import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./GameMenu.css";
import {
  FaArrowCircleLeft,
  FaArrowRight,
  FaBookOpen,
  FaHome,
  FaQuestion,
  FaYoutube,
} from "react-icons/fa";
import { FiVolume2 } from "react-icons/fi";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";
import PopUpHelp from "../extras/PopUpHelp";
import PopUpInstructions from "../extras/PopUpInstructions";

function GameMenu() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isPopUpOpenInstructions, setIsPopUpOpenInstructions] = useState(false);

  const { speak, speaking } = useSpeechSynthesis();
  const navigate = useNavigate();

  const handleImageClick = () => {
    if (!speaking) {
      // Utiliza el hook para hablar
      speak("Accede al juego haciendo clic en Ingresar.");
    }
  };
  return (
    <div className="game-menu">
      {isPopUpOpen && (
        <PopUpHelp
          onClose={() => {
            setIsPopUpOpen(false);
          }}
          url={"https://www.youtube.com/watch?v=vecJrW_cetE"}
        />
      )}
      {isPopUpOpenInstructions && (
        <PopUpInstructions
          instructions={"Accede al juego haciendo clic en Ingresar."}
          url={"public/instructions/menu-game-message.png"}
          onClose={() => {
            setIsPopUpOpenInstructions(false);
          }}
        />
      )}
      <div className="app-navigation">
        <button
          onClick={() => {
            navigate("/main-menu");
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
        {/*<h1>Juego de reconocimiento</h1>*/}
        <h1>Planeta de los Símbolos</h1>
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
      <div>
        <div className="game-content">
          <img src="public/instructions/menu-game-message.png" alt="Imagen de la Aventura" />

          <Link to="/game-config" className="link-button">
            <button>
              <FaArrowRight />
              <span className="btn-txt">Ingresar</span>
            </button>
          </Link>
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

export default GameMenu;