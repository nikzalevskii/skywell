import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./History.module.css";
import { clearHistory } from "../../store/slices/historySlice";

export default function History() {
  const { querries } = useSelector((state: RootState) => state.history);
  const dispatch = useDispatch();

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  if (querries.length === 0) {
    return <div className={styles.emptyMessage}>История запросов пуста.</div>;
  }

  return (
    <div className={styles.history}>
      <h2>История запросов</h2>
      <button onClick={handleClearHistory} className={styles.clearButton}>
        Очистить историю
      </button>
      <ul>
        {querries.map((query, index) => (
          <li key={index} className={styles.historyItem}>
            <div className={styles.label}>Город:</div>
            <div className={styles.value}>{query.city}</div>
            <div className={styles.label}>Дата:</div>
            <div className={styles.value}>
              {new Date(query.timestamp).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
