import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
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
