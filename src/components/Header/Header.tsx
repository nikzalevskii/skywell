import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const location = useLocation();

  return (
    <header
      className={`${styles.header} ${
        location.pathname === "/history" ? styles.historyActive : ""
      }`}
    >
      <div>
        <Link className={styles.logo} to="/">
          SkyWell
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>
          Главная
        </Link>
        <Link to="/history" className={styles.navLink}>
          История запросов
        </Link>
      </nav>
    </header>
  );
}
