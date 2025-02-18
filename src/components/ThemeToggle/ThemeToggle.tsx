import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./ThemeToggle.module.css";
import { toggleTheme } from "../../store/slices/themeSlice";

export default function ThemeToggle() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleTheme())} className={styles.button}>
      {isDarkMode ? "Светлая тема" : "Тёмная тема"}
    </button>
  );
}
