import Axios from "axios";
import { INVOICES_API } from "../../config";
import Cache from "./cache";

// Ajout d'une nouvelle invoices
function add(invoice) {
  return Axios.post(INVOICES_API, invoice).then(async (response) => {
    // Verification si il se trouve en cache
    const cachedInvoices = await Cache.get("invoices");
    if (cachedInvoices) {
      // Mise en cache si il n'y est pas encore
      Cache.set("invoices", [...cachedInvoices, response.data]);
    }
    return response;
  });
}
// Modification
function update(id, value, invoices) {
  return Axios.put(INVOICES_API + "/" + id, {
    ...invoices,
    // position: value,
  }).then(async (response) => {
    const cachedInvoices = await Cache.get("invoices");

    if (cachedInvoices) {
      const index = cachedInvoices.findIndex((e) => e.id === +id);
      const newcachedInvoices = response.data;
      cachedInvoices[index] = newcachedInvoices;

      Cache.set("invoices", cachedInvoices);
    }
    return response;
  });
}
// Récuperer une invoice pour la page profil
async function findInvoices(id) {
  // const cachedInvoices = await Cache.get("invoices");

  // if (cachedInvoices) {
  //   return cachedInvoices;
  // } else {
  return Axios.get(INVOICES_API + "/" + id).then((response) => {
    const invoices = response.data;
    // Cache.set("invoices", invoices);
    return invoices;
  });
}
// Récuperer tous les invoices
async function getAllInvoices() {
  const cachedInvoices = await Cache.get("invoices");
  if (cachedInvoices) {
    return cachedInvoices;
  } else {
    return Axios.get(INVOICES_API).then((response) => {
      const invoices = response.data["hydra:member"];
      Cache.set("invoices", invoices);
      return invoices;
    });
  }
}
// Supprimer une invoice
function deleteInvoices(id) {
  return Axios.delete(INVOICES_API + "/" + id).then(async (response) => {
    const cachedInvoices = await Cache.get("invoices");

    if (cachedInvoices) {
      Cache.set(
        "invoices",
        cachedInvoices.filter((e) => e.id !== id)
      );
    }
    return response;
  });
}

export default {
  add,
  update,
  findInvoices,
  getAllInvoices,
  deleteInvoices,
};
