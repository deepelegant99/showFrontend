import { NavLink } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'

const NavBar = () => {
  const { favoritesCount } = useFavorites()

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
    </nav>
  )
}

export default NavBar
