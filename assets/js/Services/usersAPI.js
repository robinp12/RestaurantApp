import Axios from "axios";
import { USERS_API } from "../../config";
import Cache from "./cache";

// Ajout d'un nouvel utilisateur
function register(user) {
  return Axios.post(USERS_API, user).then(async (response) => {
    // Verification si il se trouve en cache
    const cachedUsers = await Cache.get("users");
    if (cachedUsers) {
      // Mise en cache si il n'y est pas encore
      Cache.set("users", [...cachedUsers, response.data]);
    }
    return response;
  });
}
// Modification du role utilisateur
function update(id, value, users) {
  return Axios.put(USERS_API + "/" + id, { ...users, roles: [value] }).then(
    async (response) => {
      const cachedUsers = await Cache.get("users");

      if (cachedUsers) {
        const index = cachedUsers.findIndex((e) => e.id === +id);
        const newcachedUser = response.data;
        cachedUsers[index] = newcachedUser;

        Cache.set("users", cachedUsers);
      }
      return response;
    }
  );
}
// Modification d'un utilisateur
function updateInfo(id, users) {
  return Axios.put(USERS_API + "/" + id, users).then(async (response) => {
    const cachedUsers = await Cache.get("users");
    if (cachedUsers) {
      const index = cachedUsers.findIndex((e) => e.id === +id);
      const newcachedUser = response.data;
      cachedUsers[index] = newcachedUser;

      Cache.set("users", cachedUsers);
    }
    return response;
  });
}
// Récuperer un user pour la page profil
async function findUser(id) {
  // const cachedUsers = await Cache.get("users");

  // if (cachedUsers) {
  //   return cachedUsers;
  // } else {
  return Axios.get(USERS_API + "/" + id).then((response) => {
    const users = response.data;
    // Cache.set("users", users);
    return users;
  });
}
// Récuperer tous les users
async function getAllUsers() {
  const cachedUsers = await Cache.get("users");

  if (cachedUsers) {
    return cachedUsers;
  } else {
    return Axios.get(USERS_API).then((response) => {
      const users = response.data["hydra:member"];
      Cache.set("users", users);
      return users;
    });
  }
}
// Supprimer un user
function deleteUsers(id) {
  return Axios.delete(USERS_API + "/" + id).then(async (response) => {
    const cachedUsers = await Cache.get("users");

    if (cachedUsers) {
      Cache.set(
        "users",
        cachedUsers.filter((e) => e.id !== id)
      );
    }
    return response;
  });
}

export default {
  register,
  update,
  updateInfo,
  findUser,
  getAllUsers,
  deleteUsers,
};
