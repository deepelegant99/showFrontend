import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Show } from "../services/api";

type FavoritesContextType = {
  favorites: Show[];
  favoritesCount: number;
  toggleFavorite: (show: Show) => void;
  isFavorite: (showId: number) => boolean;
};

const FAVORITES_STORAGE_KEY = "favorite-shows";

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

type FavoritesProviderProps = {
  children: ReactNode;
};

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Show[]>(() => {
    const savedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!savedFavorites) {
      return [];
    }

    try {
      return JSON.parse(savedFavorites) as Show[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites),
    );
  }, [favorites]);

  const toggleFavorite = (show: Show) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) => favorite.id === show.id,
      );

      if (alreadyFavorite) {
        return currentFavorites.filter((favorite) => favorite.id !== show.id);
      }

      return [...currentFavorites, show];
    });
  };

  const isFavorite = (showId: number) =>
    favorites.some((favorite) => favorite.id === showId);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
};
