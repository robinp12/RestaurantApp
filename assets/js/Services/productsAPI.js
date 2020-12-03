import Axios from "axios";
import { PRODUCTS_API } from "../../config";
import Cache from "./cache";

// Ajout d'un nouvel produit
function add(product) {
  return Axios.post(PRODUCTS_API, product).then(async (response) => {
    // Verification si il se trouve en cache
    const cachedProducts = await Cache.get("products");
    if (cachedProducts) {
      // Mise en cache si il n'y est pas encore
      Cache.set("products", [...cachedProducts, response.data]);
    }
    return response;
  });
}
// Récuperer un product pour la page profil
async function findProduct(id) {
  // const cachedProducts = await Cache.get("products");

  // if (cachedProducts) {
  //   return cachedProducts;
  // } else {
  return Axios.get(PRODUCTS_API + "/" + id).then((response) => {
    const products = response.data;
    // Cache.set("products", products);
    return products;
  });
}
// Récuperer tous les products
async function getAllProducts() {
  const cachedProducts = await Cache.get("products");

  if (cachedProducts) {
    return cachedProducts;
  } else {
    return Axios.get(PRODUCTS_API).then((response) => {
      const products = response.data["hydra:member"];
      Cache.set("products", products);
      return products;
    });
  }
}
// Supprimer un product
function deleteProducts(id) {
  return Axios.delete(PRODUCTS_API + "/" + id).then(async (response) => {
    const cachedProducts = await Cache.get("products");

    if (cachedProducts) {
      Cache.set(
        "products",
        cachedProducts.filter((e) => e.id !== id)
      );
    }
    return response;
  });
}

export default {
  add,
  findProduct,
  getAllProducts,
  deleteProducts,
};
