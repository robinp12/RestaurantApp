import Axios from "axios";
import { CUSTOMERS_API } from "../../config";
import Cache from "./cache";

// Ajout d'un nouveau client
function register(customer) {
  return Axios.post(CUSTOMERS_API, customer).then(async (response) => {
    // Verification si il se trouve en cache
    const cachedCustomers = await Cache.get("customers");
    if (cachedCustomers) {
      // Mise en cache si il n'y est pas encore
      Cache.set("customers", [...cachedCustomers, response.data]);
    }
    return response;
  });
}
// Modification du role utilisateur
function update(id, value, customers) {
  return Axios.put(CUSTOMERS_API + "/" + id, {
    ...customers,
    roles: [value],
  }).then(async (response) => {
    const cachedCustomers = await Cache.get("customers");

    if (cachedCustomers) {
      const index = cachedCustomers.findIndex((e) => e.id === +id);
      const newcachedcustomer = response.data;
      cachedCustomers[index] = newcachedcustomer;

      Cache.set("customers", cachedCustomers);
    }
    return response;
  });
}
// Modification d'un utilisateur
function updateInfo(id, customers) {
  return Axios.put(CUSTOMERS_API + "/" + id, customers).then(
    async (response) => {
      const cachedCustomers = await Cache.get("customers");
      if (cachedCustomers) {
        const index = cachedCustomers.findIndex((e) => e.id === +id);
        const newcachedcustomer = response.data;
        cachedCustomers[index] = newcachedcustomer;

        Cache.set("customers", cachedCustomers);
      }
      return response;
    }
  );
}
// Récuperer un customer pour la page profil
async function findcustomer(id) {
  // const cachedCustomers = await Cache.get("customers");

  // if (cachedCustomers) {
  //   return cachedCustomers;
  // } else {
  return Axios.get(CUSTOMERS_API + "/" + id).then((response) => {
    const customers = response.data;
    // Cache.set("customers", customers);
    return customers;
  });
}
// Récuperer tous les customers
async function getAllcustomers() {
  const cachedCustomers = await Cache.get("customers");

  if (cachedCustomers) {
    return cachedCustomers;
  } else {
    return Axios.get(CUSTOMERS_API).then((response) => {
      const customers = response.data["hydra:member"];
      Cache.set("customers", customers);
      return customers;
    });
  }
}
// Supprimer un customer
function deletecustomers(id) {
  return Axios.delete(CUSTOMERS_API + "/" + id).then(async (response) => {
    const cachedCustomers = await Cache.get("customers");

    if (cachedCustomers) {
      Cache.set(
        "customers",
        cachedCustomers.filter((e) => e.id !== id)
      );
    }
    return response;
  });
}

export default {
  register,
  update,
  updateInfo,
  findcustomer,
  getAllcustomers,
  deletecustomers,
};
