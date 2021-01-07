import Axios from "axios";
import { ORDERS_API } from "../../config";
import Cache from "./cache";

// Ajout d'un nouvel order
function add(order) {
  return Axios.post(ORDERS_API, order).then(async (response) => {
    return response;
  });
}

function sendMail(order) {
  return Axios.post("/order-confirm/" + order);
}

// Récuperer un order pour la page profil
async function findOrder(id) {
  // const cachedOrders = await Cache.get("orders");

  // if (cachedOrders) {
  //   return cachedOrders;
  // } else {
  return Axios.get(ORDERS_API + "/" + id).then((response) => {
    const orders = response.data;
    // Cache.set("orders", orders);
    return orders;
  });
}
// Récuperer tous les orders
async function getAllOrders() {
  return Axios.get(ORDERS_API).then((response) => {
    const orders = response.data["hydra:member"];
    Cache.set("orders", orders);
    return orders;
  });
}
// Supprimer un order
function deleteOrders(id) {
  return Axios.delete(ORDERS_API + "/" + id).then(async (response) => {
    const cachedOrders = await Cache.get("orders");

    if (cachedOrders) {
      Cache.set(
        "orders",
        cachedOrders.filter((e) => e.id !== id)
      );
    }
    return response;
  });
}

export default {
  add,
  findOrder,
  getAllOrders,
  deleteOrders,
  sendMail,
};
