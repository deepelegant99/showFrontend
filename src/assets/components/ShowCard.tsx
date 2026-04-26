import { useState } from "react";
import type { Show } from "../../services/api";
import { useFavorites } from "../../context/FavoritesContext";

type ShowCardProps = {
  show: Show;
};

const ShowCard = ({ show }: ShowCardProps) => {
  const [showPosterFallback, setShowPosterFallback] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(show.id);

  return (
    <div className="show-card">
      {showPosterFallback ? (
        <div
          className="show-poster show-poster-fallback"
          aria-label={`${show.name} poster placeholder`}
        >
          <span>{show.name}</span>
        </div>
      ) : (
        <img
          className="show-poster"
          src={show.imageUrl}
          alt={show.name}
          onError={() => setShowPosterFallback(true)}
        />
      )}
      <h2>{show.name}</h2>
      <p>{show.premiered}</p>
      <button
        type="button"
        className={favorite ? "favorite-button active" : "favorite-button"}
        onClick={() => toggleFavorite(show)}
      >
        {favorite ? "Remove Favorite" : "Add Favorite"}
      </button>
    </div>
  );
};

export default ShowCard;
