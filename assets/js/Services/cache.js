import React from "react";

const cache = {};

//Setter cache
function set(key, data) {
  cache[key] = {
    data: data,
    cachedAt: new Date().getTime(),
  };
}
//Getter cache
function get(key) {
  return new Promise((resolve) => {
    resolve(
      cache[key] && cache[key]?.cachedAt + 10 * 60 * 1000 > new Date().getTime()
        ? cache[key].data
        : null
    );
  });
}
//Retourne le temps de la derniere mise en cache
function lastUpdate(key) {
  let updatedTime =
    new Date().getMinutes() - new Date(cache[key]?.cachedAt).getMinutes() || 0;

  if (updatedTime == 0) {
    return <i> {"Mise à jour des données à l'instant"}</i>;
  } else if (updatedTime > 10) {
    return <i> {"Dernière mise à jour des données il y a plus de 10 min"}</i>;
  } else {
    return (
      <i>
        {" "}
        {"Dernière mise à jour des données il y a " + updatedTime + " min"}
      </i>
    );
  }
}
//Effacer le cache
function invalidate(key) {
  delete cache[key];
}

export default {
  set,
  get,
  lastUpdate,
  invalidate,
};
