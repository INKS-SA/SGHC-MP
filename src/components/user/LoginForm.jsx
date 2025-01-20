import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import "./LoginForm.css";

export const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    console.log("Login iniciado"); // Log para depuración

    try {
      await login({ username, password });
      toast.success("Ingreso exitoso.", { position: "top-right", autoClose: 3000 });
    } catch (error) {
      console.error("Error al ingresar:", error);
      toast.error("Credenciales incorrectas. Inténtalo de nuevo.", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className="login-content">
      <Grid container justifyContent="space-between" alignItems="center">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#8ba082",
            color: "white",
            "&:hover": { backgroundColor: "#5d6c56" },
          }}
        >
          Atrás
        </Button>
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>ESPECIALIDADES ODONTOLÓGICAS</h1>
        <Button
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#8ba082",
            color: "white",
            "&:hover": { backgroundColor: "#5d6c56" },
          }}
        >
          Inicio
        </Button>
      </Grid>

      <div className="login">
        <div className="login-form">
          <h2 className="login-heading">Iniciar Sesión</h2>
          <form onSubmit={(e) => handleLogin(e)}>
            <TextField
              fullWidth
              id="username"
              label="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
            />
            <Button
              type="submit" // Tipo explícito
              startIcon={<LoginIcon />}
              sx={{
                backgroundColor: "#8ba082",
                color: "white",
                "&:hover": { backgroundColor: "#5d6c56" },
              }}
            >
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
