import { useEffect, useState } from "react";
import loginService from "../services/login";

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cargar el usuario del localStorage al iniciar la aplicación
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const login = async ({ username, password }) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    // No es necesario eliminar el header común porque ya no lo configuramos aquí
  };

  return { user, login, logout };
}
