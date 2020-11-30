export const API_URL = "http://localhost:8000/api/";
// export const API_URL = process.env.API_URL;

// Regroupement dans un fichier pour surcharger sur heroku
export const USERS_API = API_URL + "users";
export const INVOICES_API = API_URL + "invoices";
export const CUSTOMERS_API = API_URL + "customers";
export const LOGIN_API = API_URL + "login_check";
