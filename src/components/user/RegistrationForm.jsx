import React, { useState, useCallback } from "react";
import { useRegistration } from "../../hooks/useRegistration";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./RegistrationForm.css";
import {
  FaArrowCircleLeft,
  FaHome,
  FaQuestion,
  FaYoutube,
} from "react-icons/fa";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";
import PopUpHelp from "../extras/PopUpHelp";
import PopUpInstructions from "../extras/PopUpInstructions";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isPopUpOpenInstructions, setIsPopUpOpenInstructions] = useState(false);
  const { speak, speaking } = useSpeechSynthesis();
  const navigate = useNavigate();

  const { registerUser } = useRegistration();

  const handleRegister = async (e) => {
    e.preventDefault();

    {/*if (!termsAccepted) {
      toast.error("Debes aceptar los términos y condiciones.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }*/}

    // Validar las contraseñas
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-/:;&@.?!%*#]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "La contraseña debe tener al menos 8 caracteres y contener una letra mayúscula, una minúscula, un número y un símbolo (-/:;&@.?!%*#)",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      setPassword("");
      setConfirmPassword("");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.", {
        position: "top-right",
        autoClose: 3000,
      });
      setConfirmPassword("");
      return;
    }

    try {
      await registerUser({ username, name, password });
      toast.success("Registro exitoso", {
        position: "top-right",
        autoClose: 3000,
      });
      setUsername("");
      setName("");
      setPassword("");
      setConfirmPassword("");
      setTermsAccepted(false);
      navigate("/login");
    } catch (error) {
      console.error("Error al hacer registro:", error);
      toast.error("El usuario ya existe. Por favor, inténtalo de nuevo.", {
        position: "top-right",
        autoClose: 3000,
      });
      setUsername("");
      setName("");
      setPassword("");
      setConfirmPassword("");
      setTermsAccepted(false);
    }
  };

  const handleTermsAcceptedChange = useCallback(() => {
    setTermsAccepted(!termsAccepted);
  }, [termsAccepted]);

  return (
    <div className="registration-content">
      {isPopUpOpen && (
        <PopUpHelp
          onClose={() => {
            setIsPopUpOpen(false);
          }}
          url={"https://www.youtube.com/watch?v=8tJmZkf5o88"}
        />
      )}
      {isPopUpOpenInstructions && (
        <PopUpInstructions
          instructions={"Regístrate ingresando tus nombres, correo y contraseña."}
          url={"public/instructions/register-message.png"}
          onClose={() => {
            setIsPopUpOpenInstructions(false);
          }}
        />
      )}
      <div className="app-navigation">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <FaArrowCircleLeft />
          <span>Atrás</span>
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <FaHome />
          <span>Inicio</span>
        </button>
        <h1>PictoAndes</h1>
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
      <div className="registration">
        <div className="img-form">
          <img
            src="public/characters/andino.png"
            alt="imagen de la aventura"
          />
        </div>
        <div className="registration-form">
          <h3>Registrarse</h3>
          <form onSubmit={handleRegister}>
            <div className="form-input">
              <label htmlFor="nombre">
              <p>Nombres:</p>
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Ingresa tu nombre. Ej: Alexis Vizuete"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-input">
              <label htmlFor="correo">
              <p>Correo electrónico:</p>
              </label>
              <input
                id="correo"
                type="email"
                placeholder="Ingresa tu corrreo electrónico. Ej: alexis@correo.com"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-input">
            <label htmlFor="password">
              <p>Contraseña:</p>
              </label>  
              <div className="password-field">
                <input
                id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-icon"
                >
                  {showPassword ? "👁️" : "🔒"}
                </button>
              </div>
              <div className="password">
                <span>
                La contraseña debe tener al menos 8 caracteres y contener una letra mayúscula, una minúscula, un número y un símbolo (-/:;&@.?!%*#)
                </span>
              </div>
            </div>
            <div className="form-input">
              <label htmlFor="password2">
                <p>Confirmar contraseña:</p>
              </label>
              <div className="password-field">
                <input
                  id="password2"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma tu contraseña"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="eye-icon"
                >
                  {showConfirmPassword ? "👁️" : "🔒"}
                </button>
              </div>
            </div>
            
            <div>
              <button className="register-button" type="submit">
                Registrarse
              </button>
            </div>
          </form>
          {/*<div className="footer-register">
            <p>
              ¿Ya tienes una cuenta?
              <Link to="/login" className="register-link">
                {" "}
                Iniciar sesión
              </Link>
            </p>
          </div>9*/}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
