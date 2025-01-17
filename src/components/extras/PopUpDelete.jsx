import React from "react";
import "./PopUp.css";

function PopUpDelete({ onClose, onDelete, pictogram }) {
  const handleDelete = () => {
    onDelete(pictogram);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span>¿Está seguro que desea eliminar este pictograma?</span>
        <div className="buttons-exit">
          <button onClick={handleDelete}>Sí</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default PopUpDelete;
