import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar interceptor para manejar 401
instance.interceptors.response.use(
  (response) => response, // Retorna la respuesta si no hay errores
  (error) => {
    if (error.response && error.response.status === 401) {
      // Manejo del error 401
      console.warn("Token expirado o no válido. Redirigiendo al login...");
      
      // Limpia el localStorage y elimina el token
      window.localStorage.removeItem("loggedUser");
      delete instance.defaults.headers.common["Authorization"];
      
      // Redirige al login
      window.location.href = "/login";
    }
    // Propaga el error para manejarlo en los servicios o componentes
    return Promise.reject(error);
  }
);

// Agregar token automáticamente si existe en el localStorage
instance.interceptors.request.use((config) => {
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  if (loggedUser && loggedUser.token) {
    config.headers["Authorization"] = `Bearer ${loggedUser.token}`;
  }
  return config;
});

export default instance;
