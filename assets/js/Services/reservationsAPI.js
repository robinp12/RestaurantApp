import Axios from "axios";
import { RESERVATIONS_API } from "../../config";
import Cache from "./cache";

// Ajout d'une nouvelle reservations
function add(reservation) {
  return Axios.post(RESERVATIONS_API, reservation).then(async (response) => {
    // Verification si il se trouve en cache
    const cachedReservations = await Cache.get("reservations");
    if (cachedReservations) {
      // Mise en cache si il n'y est pas encore
      Cache.set("reservations", [...cachedReservations, response.data]);
    }
    return response;
  });
}
function sendMail(reservation) {
  return Axios.post("/reserve-confirm/" + reservation);
}
// Modification
function update(id, value, reservations) {
  return Axios.put(RESERVATIONS_API + "/" + id, {
    ...reservations,
    position: value,
  }).then(async (response) => {
    const cachedReservations = await Cache.get("reservations");

    if (cachedReservations) {
      const index = cachedReservations.findIndex((e) => e.id === +id);
      const newcachedReservations = response.data;
      cachedReservations[index] = newcachedReservations;

      Cache.set("reservations", cachedReservations);
    }
    return response;
  });
}
// Récuperer une reservation pour la page profil
async function findReservation(id) {
  // const cachedReservations = await Cache.get("reservations");

  // if (cachedReservations) {
  //   return cachedReservations;
  // } else {
  return Axios.get(RESERVATIONS_API + "/" + id).then((response) => {
    const reservations = response.data;
    // Cache.set("reservations", reservations);
    return reservations;
  });
}
// Récuperer tous les reservations
async function getAllReservations() {
  const cachedReservations = await Cache.get("reservations");

  if (cachedReservations) {
    return cachedReservations;
  } else {
    return Axios.get(RESERVATIONS_API).then((response) => {
      const reservations = response.data["hydra:member"];
      Cache.set("reservations", reservations);
      return reservations;
    });
  }
}
// Supprimer une reservation
function deleteReservations(id) {
  return Axios.delete(RESERVATIONS_API + "/" + id).then(async (response) => {
    const cachedReservations = await Cache.get("reservations");

    if (cachedReservations) {
      Cache.set(
        "reservations",
        cachedReservations.filter((e) => e.id !== id)
      );
    }
    return response;
  });
}

export default {
  add,
  sendMail,
  update,
  findReservation,
  getAllReservations,
  deleteReservations,
};
