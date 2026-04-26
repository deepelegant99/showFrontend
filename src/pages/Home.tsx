import { useEffect, useState } from "react";
import ShowCard from "../assets/components/ShowCard";
import { getShows, searchShows, type Show } from "../services/api";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shows, setShows] = useState<Show[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShows = async () => {
      try {
        setError(null);
        const nextShows = await getShows();
        setShows(nextShows);
      } catch {
        setError("There was an error loading the shows.");
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, []);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const nextShows = searchTerm.trim()
        ? await searchShows(searchTerm.trim())
        : await getShows();
      setShows(nextShows);
    } catch {
      setError("There was an error searching for shows.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search shows..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {loading && <p>Loading shows...</p>}
      {error && <p>{error}</p>}
      <div className="show-grid">
        {!loading &&
          !error &&
          shows.map((show) => <ShowCard key={show.id} show={show} />)}
      </div>
    </div>
  );
};

export default Home;
