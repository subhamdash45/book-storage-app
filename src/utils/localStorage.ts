const FAVORITES_KEY = "favoriteBooks";

export const toggleFavorite = (id: number): void => {
  const favorites = getFavorites();
  if (favorites.includes(id)) {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favorites.filter((fav) => fav !== id)),
    );
  } else {
    favorites.push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const isFavorite = (id: number): boolean => {
  return getFavorites().includes(id);
};

const getFavorites = (): number[] => {
  const favoritesDetails = localStorage.getItem(FAVORITES_KEY);
  return favoritesDetails ? JSON.parse(favoritesDetails) : [];
};
