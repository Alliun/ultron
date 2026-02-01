import { NavLink } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext.jsx'
import styles from './NavBar.module.css'

export function NavBar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand}>
          <span className={styles.logo}>🤝</span>
          Aidconnect
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/discover" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
            Discover
          </NavLink>
          <NavLink to="/matching" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
            Matching
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
            About
          </NavLink>
          <button 
            onClick={toggleTheme} 
            className={styles.themeToggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  )
}

