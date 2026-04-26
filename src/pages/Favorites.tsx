import ShowCard from "../assets/components/ShowCard";
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>Your favorite shows will appear here after you add them on the home page.</p>
      ) : (
        <div className="show-grid">
          {favorites.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
