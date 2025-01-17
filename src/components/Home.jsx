import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import LoginIcon from "@mui/icons-material/Login";
import StartIcon from "@mui/icons-material/Start";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

function Home({ user, logout }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const isLoggedIn = !!user;

  // Funciones para manejar el diálogo
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    setDeleteDialogOpen(false);
    logout();
  };

  return (
    <div className="welcome">
      {/* Dialog de confirmación de logout */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar Cierre de Sesión
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro que desea cerrar la sesión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmLogout} color="error" autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>

      {!isLoggedIn ? (
        <>
          {/* Componente de LOGIN */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
          <div>
          <div
            className="img-form"
            style={{
              height: "75vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="backgrounds/main.png"
              alt="Background"
              style={{ height: "100%", width: "auto", objectFit: "cover" }}
            />
          </div>

            <Link to="/login">
              <Button
                color="primary"
                startIcon={<LoginIcon />}
                size="large"
                sx={{
                  color: "white",
                  backgroundColor: "#8ba082",
                  marginBottom: 5,
                  "&:hover": {
                    backgroundColor: "#5d6c56",
                  },
                }}
                style={{
                  fontSize: "20px", // Aumenta el tamaño del texto
                  padding: "15px 30px", // Aumenta el relleno para hacer el botón más grande
                }}
              >
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* Componente de HOME */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginLeft: "auto",
              marginRight: "0.5%",
            }}
          >
            <Button
              startIcon={<LogoutIcon />}
              onClick={handleDeleteDialogOpen}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                color: "white",
                backgroundColor: "#8ba082",
                margin: 2,
                "&:hover": {
                  backgroundColor: "#5d6c56",
                },
              }}
              style={{
                fontSize: "15px", // Aumenta el tamaño del texto
                padding: "7px 20px", // Aumenta el relleno para hacer el botón más grande
                marginLeft: "auto", // Mueve el botón a la derecha
              }}
            >
              Salir
            </Button>
          </div>

          <div
            className="img-form"
            style={{
              height: "75vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="backgrounds/main.png"
              alt="Background"
              style={{ height: "100%", width: "auto", objectFit: "cover" }}
            />
          </div>

          <div>
            <Link to="/main-menu" className="link-button">
              <Button
                variant="contained"
                color="primary"
                startIcon={<StartIcon />}
                size="large"
                sx={{
                  color: "white",
                  backgroundColor: "#8ba082",
                  marginBottom: 5,
                  "&:hover": {
                    backgroundColor: "#5d6c56",
                  },
                }}
                style={{
                  fontSize: "20px", // Aumenta el tamaño del texto
                  padding: "15px 30px", // Aumenta el relleno para hacer el botón más grande
                }}
              >
                Continuar
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
