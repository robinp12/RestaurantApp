import Axios from "axios";
import { CATEGORIES_API } from "../../config";
import Cache from "./cache";

// Ajout d'un nouvel categorie
function add(category) {
  return Axios.post(CATEGORIES_API, category).then(async (response) => {
    // Verification si il se trouve en cache
    const cachedCategories = await Cache.get("categories");
    if (cachedCategories) {
      // Mise en cache si il n'y est pas encore
      Cache.set("categories", [...cachedCategories, response.data]);
    }
    return response;
  });
}
// Modification
function update(id, value, categories) {
  return Axios.put(CATEGORIES_API + "/" + id, {
    ...categories,
    position: value,
  }).then(async (response) => {
    const cachedCategories = await Cache.get("categories");

    if (cachedCategories) {
      const index = cachedCategories.findIndex((e) => e.id === +id);
      const newcachedCategories = response.data;
      cachedCategories[index] = newcachedCategories;

      Cache.set("categories", cachedCategories);
    }
    return response;
  });
}
// Récuperer un category pour la page profil
async function findCategory(id) {
  // const cachedCategories = await Cache.get("categories");

  // if (cachedCategories) {
  //   return cachedCategories;
  // } else {
  return Axios.get(CATEGORIES_API + "/" + id).then((response) => {
    const categories = response.data;
    // Cache.set("categories", categories);
    return categories;
  });
}
// Récuperer tous les categories
async function getAllCategories() {
  const cachedCategories = await Cache.get("categories");

  if (cachedCategories) {
    return cachedCategories;
  } else {
    return Axios.get(CATEGORIES_API).then((response) => {
      const categories = response.data["hydra:member"];
      Cache.set("categories", categories);
      return categories;
    });
  }
}
// Supprimer un category
function deleteCategories(id) {
  return Axios.delete(CATEGORIES_API + "/" + id).then(async (response) => {
    const cachedCategories = await Cache.get("categories");

    if (cachedCategories) {
      Cache.set(
        "categories",
        cachedCategories.filter((e) => e.id !== id)
      );
    }
    return response;
  });
}

export default {
  add,
  update,
  findCategory,
  getAllCategories,
  deleteCategories,
};
