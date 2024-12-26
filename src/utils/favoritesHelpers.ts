export const getFavorites = (): string[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export const isFavorite = (id: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(id);
};

export const addFavorite = (id: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeFavorite = (id: string): void => {
  const favorites = getFavorites().filter((favId) => favId !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
