import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./ThemeToggle.module.css";
import { toggleTheme } from "../../store/slices/themeSlice";

export default function ThemeToggle() {
  const isPurpleMode = useSelector((state: RootState) => state.theme.isPurpleMode);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleTheme())} className={styles.button}>
      {isPurpleMode ? "Светлая тема" : "Тёмная тема"}
    </button>
  );
}
