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

  return (
    <div className={styles.history}>
      <h3>История запросов</h3>
      <button onClick={handleClearHistory} className={styles.clearButton}>
        Очистить историю
      </button>
      <ul>
        {querries.map((query, index) => (
          <li key={index}>
            <p>Город: {query.city}</p>
            <p>Дата и время: {new Date(query.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
