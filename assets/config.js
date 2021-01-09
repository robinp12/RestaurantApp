import socketIOClient from "socket.io-client";
// export const API_URL = "http://localhost:8000/api/";
export const API_URL = process.env.API_URL;

export const socket = socketIOClient("https://www.shop-lechevalblanc.be", {
  transports: ["websocket"],
  secure: true,
  reconnect: true,
  rejectUnauthorized: false,
});
// Regroupement dans un fichier pour surcharger
export const SETTINGS_API = API_URL + "settings";
export const USERS_API = API_URL + "users";
export const CUSTOMERS_API = API_URL + "customers";
export const RESERVATIONS_API = API_URL + "reservations";
export const INVOICES_API = API_URL + "invoices";
export const ORDERS_API = API_URL + "orders";
export const CATEGORIES_API = API_URL + "categories";
export const PRODUCTS_API = API_URL + "products";
export const DETAILS_API = API_URL + "details";
export const LOGIN_API = API_URL + "login_check";
