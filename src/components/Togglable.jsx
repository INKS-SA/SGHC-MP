import React, { useState } from "react";

export default function Togglable({ children, buttonLabel }) {
  const [visible, setVisible] = useState(false);
  // Estilos condicionales
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div>
      <div>
        <button style={hideWhenVisible} onClick={() => setVisible(true)}>
          {buttonLabel}
        </button>
        <button style={showWhenVisible} onClick={() => setVisible(false)}>
          Close
        </button>
      </div>
      <div style={showWhenVisible}>{children}</div>
    </div>
  );
}
