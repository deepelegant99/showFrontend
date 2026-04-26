import { NavLink } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'
import { useTheme } from '../../context/ThemeContext'

const NavBar = () => {
  const { favoritesCount } = useFavorites()
  const { theme, setTheme, themes } = useTheme()

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="brand-link">
          <span className="brand-mark">T</span>
          <span>TV Show App</span>
        </NavLink>
      </div>
      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        >
          Favorites ({favoritesCount})
        </NavLink>
      </div>
      <div className="theme-switcher" aria-label="Theme switcher">
        {themes.map((option) => (
          <button
            key={option.id}
            type="button"
            className={
              theme === option.id
                ? "theme-option active"
                : "theme-option"
            }
            onClick={() => setTheme(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
