import Axios from "axios";
import { DETAILS_API } from "../../config";
import Cache from "./cache";

// Ajout d'un nouveau detail
function add(detail) {
  return Axios.post(DETAILS_API, detail).then(async (response) => {
    // Verification si il se trouve en cache
    const cachedDetails = await Cache.get("details");
    if (cachedDetails) {
      // Mise en cache si il n'y est pas encore
      Cache.set("details", [...cachedDetails, response.data]);
    }
    return response;
  });
}
// Modification
function update(id, value, details) {
  return Axios.put(DETAILS_API + "/" + id, {
    ...details,
    position: value,
  }).then(async (response) => {
    const cachedDetails = await Cache.get("details");

    if (cachedDetails) {
      const index = cachedDetails.findIndex((e) => e.id === +id);
      const newcachedDetails = response.data;
      cachedDetails[index] = newcachedDetails;

      Cache.set("details", cachedDetails);
    }
    return response;
  });
}
// Récuperer un detail pour la page profil
async function findDetail(id) {
  // const cachedDetails = await Cache.get("details");

  // if (cachedDetails) {
  //   return cachedDetails;
  // } else {
  return Axios.get(DETAILS_API + "/" + id).then((response) => {
    const details = response.data;
    // Cache.set("details", details);
    return details;
  });
}
// Récuperer tous les details
async function getAllDetails() {
  const cachedDetails = await Cache.get("details");

  if (cachedDetails) {
    return cachedDetails;
  } else {
    return Axios.get(DETAILS_API).then((response) => {
      const details = response.data["hydra:member"];
      Cache.set("details", details);
      return details;
    });
  }
}
// Supprimer un detail
function deleteDetails(id) {
  return Axios.delete(DETAILS_API + "/" + id).then(async (response) => {
    const cachedDetails = await Cache.get("details");

    if (cachedDetails) {
      Cache.set(
        "details",
        cachedDetails.filter((e) => e.id !== id)
      );
    }
    return response;
  });
}

export default {
  add,
  update,
  findDetail,
  getAllDetails,
  deleteDetails,
};
