import Axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "../../config";
import cache from "./cache";

//Action de deconnexion
function logout() {
  window.localStorage.removeItem("authToken");
  delete Axios.defaults.headers["Authorization"];
  cache.invalidate("hospitals");
  cache.invalidate("hospitalsMap");
  cache.invalidate("users");
  cache.invalidate("datas");
}
//Action de connexion
function authenticate(login) {
  return Axios.post(LOGIN_API, login)
    .then((response) => response.data.token)
    .then((token) => {
      //Token Login en localStorage
      window.localStorage.setItem("authToken", token);
      setToken(token);
    });
}
// Token dans les headers
function setToken(token) {
  Axios.defaults.headers["Authorization"] = "Bearer " + token;
}
//Mise en place d'une expiration
function setup() {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const { exp } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) {
      setToken(token);
    }
  }
}
//Verifier si l'user est connecté
function isAuth() {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const { exp } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}
//Verifier si l'user connecté est admin ou superadmin
function isAdmin() {
  const token = window.localStorage.getItem("authToken");
  if (
    jwtDecode(token).roles.includes("SUPERADMIN") ||
    jwtDecode(token).roles.includes("ROLE_ADMIN")
  ) {
    return true;
  }
  return false;
}
//Avoir des informations breves sur l'user connecté
function getCurrent() {
  const token = window.localStorage.getItem("authToken");
  return jwtDecode(token);
}

export default {
  authenticate,
  logout,
  setup,
  isAuth,
  isAdmin,
  getCurrent,
};
