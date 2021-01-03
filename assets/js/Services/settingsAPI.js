import Axios from "axios";
import { SETTINGS_API } from "../../config";
import Cache from "./cache";

// Ajout d'une nouvelle invoices
// function add(invoice) {
//   return Axios.post(SETTINGS_API, invoice).then(async (response) => {
//     // Verification si il se trouve en cache
//     const cachedInvoices = await Cache.get("invoices");
//     if (cachedInvoices) {
//       // Mise en cache si il n'y est pas encore
//       Cache.set("invoices", [...cachedInvoices, response.data]);
//     }
//     return response;
//   });
// }
// Modification
function update(id, settings) {
  return Axios.put(SETTINGS_API + "/" + id, {
    ...settings,
    // position: value,
  }).then(async (response) => {
    const cached = await Cache.get("settings");

    if (cached) {
      const index = cached.findIndex((e) => e.id === +id);
      const newcached = response.data;
      cached[index] = newcached;

      Cache.set("settings", cached);
    }
    return response;
  });
}
// Récuperer une invoice pour la page profil
async function findSetting(id) {
  // const cachedInvoices = await Cache.get("invoices");

  // if (cachedInvoices) {
  //   return cachedInvoices;
  // } else {
  return Axios.get(SETTINGS_API + "/" + id).then((response) => {
    const invoices = response.data;
    // Cache.set("invoices", invoices);
    return invoices;
  });
}
// Récuperer tous les invoices
// async function getAllInvoices() {
//   const cachedInvoices = await Cache.get("invoices");
//   if (cachedInvoices) {
//     return cachedInvoices;
//   } else {
//     return Axios.get(SETTINGS_API).then((response) => {
//       const invoices = response.data["hydra:member"];
//       Cache.set("invoices", invoices);
//       return invoices;
//     });
//   }
// }
// Supprimer une invoice
// function deleteInvoices(id) {
//   return Axios.delete(SETTINGS_API + "/" + id).then(async (response) => {
//     const cachedInvoices = await Cache.get("invoices");

//     if (cachedInvoices) {
//       Cache.set(
//         "invoices",
//         cachedInvoices.filter((e) => e.id !== id)
//       );
//     }
//     return response;
//   });
// }

export default {
  update,
  findSetting,
};
