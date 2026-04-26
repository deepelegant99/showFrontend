import "./App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Routes, Route } from "react-router-dom";
import NavBar from "./assets/components/NavBar";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
