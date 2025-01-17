import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import userService from "../../services/users";
import {
  FaSave,
  FaTimes,
  FaArrowCircleLeft,
  FaHome,
  FaQuestion,
  FaYoutube,
} from "react-icons/fa";
import PopUpHelp from "../extras/PopUpHelp";
import PopUpInstructions from "../extras/PopUpInstructions";
import "./EditUser.css"; // Importa el archivo CSS

function EditUser({ user }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isPopUpOpenInstructions, setIsPopUpOpenInstructions] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newUsername, setNewUsername] = useState(user.username);
  const [newName, setNewName] = useState(user.name);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validar que la contraseña antigua sea correcta
    if (changePassword && oldPassword !== user.password) {
      toast.error("La contraseña antigua es incorrecta.", {
        position: "top-right",
        autoClose: 3000,
      });
      setOldPassword("");
      return;
    }

    // Validar que la nueva contraseña y la confirmación coincidan
    if (changePassword && newPassword !== confirmNewPassword) {
      toast.error("Las contraseñas nuevas no coinciden.", {
        position: "top-right",
        autoClose: 3000,
      });
      setNewPassword("");
      setConfirmNewPassword("");
      return;
    }

    const updatedUser = {
      username: newUsername,
      name: newName,
      password: changePassword ? newPassword : user.password,
    };

    try {
      await userService.updateUser(user.id, updatedUser);

      // Notificación de éxito
      toast.success("Usuario editado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      setOldPassword("");
      //setNewUsername("");
      //setNewName("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowPassword(false);
      setChangePassword(false);
    } catch (error) {
      // Notificación de error
      toast.error("Error al editar el usuario.", {
        position: "top-right",
        autoClose: 3000,
      });
      setOldPassword("");
      setNewUsername("");
      setNewName("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowPassword(false);
      setChangePassword(false);
    }
  };

  return (
    <div className="edit-content">
      {isPopUpOpen && (
        <PopUpHelp
          onClose={() => {
            setIsPopUpOpen(false);
          }}
          url={"https://www.youtube.com/watch?v=lJiEc1dBbRQ"}
        />
      )}
      {isPopUpOpenInstructions && (
        <PopUpInstructions
          instructions={"Indicaciones"}
          url={"/public/instructions/indicaciones.png"}
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

      <div className="edit-user-form">
        <div className="form-section-edit">
          <h3>Editar Usuario - Información Básica</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-input">
              <p>Nombre:</p>
              <input
                type="text"
                placeholder="Ingresa un Nombre"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-input">
              <p>Correo electrónico:</p>
              <input
                type="text"
                placeholder="Ingresa un Nombre de Usuario"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-input">
              <p>Contraseña Antigua:</p>
              <input
                type="password"
                placeholder="Ingresa la Contraseña Antigua"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-input">
              <label>
                Cambiar Contraseña:
                <input
                  type="checkbox"
                  checked={changePassword}
                  onChange={() => setChangePassword(!changePassword)}
                />
              </label>
            </div>
            <div className="button-container">
              <button type="submit">
                <FaSave />
                <span> Guardar</span>
              </button>
              <button type="button" onClick={() => setShowPassword(false)}>
                <FaTimes />
                <span> Cancelar</span>
              </button>
            </div>
          </form>
        </div>
        {changePassword && (
          <div className="form-section-edit">
            <h3>Cambiar Contraseña</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-input">
                <p>Nueva Contraseña:</p>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa una Nueva Contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
              </div>
              <div className="form-input">
                <p>Confirmar Nueva Contraseña:</p>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirma la Nueva Contraseña"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
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
              </div>
              <div className="button-container">
                <button type="submit">
                  <FaSave />
                  <span> Guardar Contraseña</span>
                </button>
                <button type="button" onClick={() => setShowPassword(false)}>
                  <FaTimes />
                  <span> Cancelar</span>
                </button>
              </div>
            </form>
          </div>
        )}
      
      </div>
    </div>
  );
}

export default EditUser;
