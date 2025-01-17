import React from "react";
import "./FloatingMenu.css";
import { FaTimes } from "react-icons/fa";

const FloatingMenu = ({ onClose }) => {
  return (
    <div className="floating-menu">
      <div className="floating-menu-content">
        <div className="hd-menu">
          <div className="close">
            <button>
              <FaTimes className="close-txt" onClick={onClose} />
            </button>
          </div>
        </div>
        <div className="menu-buttons">
          <button
            onClick={() => {
              //window.open("https://fis.epn.edu.ec/index.php/es/", "_blank");
            }}
          >
            Sobre nosotros
          </button>
          <button
            onClick={() => {
              //window.open("https://www.epn.edu.ec/", "_blank");
            }}
          >
            Contactanos
          </button>
          <button
            onClick={() => {
              //window.open("https://ludolab.epn.edu.ec/", "_blank");
            }}
          >
            Colaboradores
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingMenu;
