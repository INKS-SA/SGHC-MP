import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Welcome.css";
import PopUpExit from "./extras/PopUpExit";
import {
  AutoStories as AutoStoriesIcon,
  CalendarMonth as CalendarMonthIcon,
  Timeline as TimelineIcon,
  Logout as LogoutIcon,
  ArrowBack as ArrowBackIcon
} from "@mui/icons-material";
import {
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";

function Welcome({ user, logout }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!user;

  const menuItems = [
    {
      to: "/patients",
      icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />,
      text: "Historias Clinicas",
      description: "Gestión de historias clínicas"
    },
    {
      to: "/agendamiento",
      icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />,
      text: "Agenda de Citas",
      description: "Ver y gestionar citas"
    },
    {
      to: "/planificacion",
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      text: "Planificación y Presupuesto",
      description: "Gestión de planificación y presupuesto",
      adminOnly: true
    }
  ];

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    setDeleteDialogOpen(false);
    logout();
    navigate("/");
  };

  return (
    <div style={{ 
      backgroundColor: '#f5f1ef', 
      minHeight: '100vh', 
      height: '100%', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar Cierre de Sesión</DialogTitle>
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
            Si
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        width: "100%", 
        position: "fixed", 
        top: 0, 
        padding: 8 
      }}>
        {isLoggedIn && (
          <Button
            variant="contained"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              color: "white",
              backgroundColor: "#8ba082",
              margin: 2,
              "&:hover": {
                backgroundColor: "#5d6c56",
              },
            }}
          >
            Atrás
          </Button>
        )}

        {isLoggedIn && (
          <Button
            startIcon={<LogoutIcon />}
            variant="contained"
            size="large"
            onClick={handleDeleteDialogOpen}
            sx={{
              color: "white",
              backgroundColor: "#8ba082",
              margin: 2,
              "&:hover": {
                backgroundColor: "#5d6c56",
              },
            }}
          >
            Salir
          </Button>
        )}
      </div>

      {isLoggedIn && (
        <Container maxWidth="md" sx={{ mt: 10, flexGrow: 1 }}>
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom 
            sx={{ mb: 4 , color:'#383434'}}
          >
            Bienvenido
          </Typography>

          <Grid container spacing={3}>
            {menuItems.map((item, index) => (
              (!item.adminOnly || user.role === "admin") && (
                <Grid item xs={12} key={index}>
                  <Paper 
                    elevation={3}
                    sx={{ 
                      p: 2,
                      transition: 'transform 0.2s',
                      backgroundColor: '#8ba082',
                      color: 'white',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                        cursor: 'pointer',
                      }
                    }}
                  >
                    <Link 
                      to={item.to}
                      style={{ 
                        textDecoration: "none", 
                        color: 'inherit',
                        display: 'block'
                      }}
                    >
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          {item.icon}
                        </Grid>
                        <Grid item xs>
                          <Typography variant="h5">
                            {item.text}
                          </Typography>
                          <Typography variant="body2" color="white">
                            {item.description}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Link>
                  </Paper>
                </Grid>
              )
            ))}
          </Grid>
        </Container>
      )}

    </div>
  );
}

export default Welcome;
