import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./WeatherDisplay.module.css";

export default function WeatherDisplay() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );
  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;
  if (!data) return null;

  return (
    <div className={styles.weather}>
      <h2>Погода сейчас</h2>
      <h3>
        {data.location.name}, {data.location.country}
      </h3>
      <p>
        <span className={`${styles.label} ${styles.temperature}`}>
          Температура:
        </span>
        <span className={styles.value}>{data.current.temp_c}°C</span>
      </p>
      <p>
        <span className={`${styles.label} ${styles.humidity}`}>Влажность:</span>
        <span className={styles.value}>{data.current.humidity}%</span>
      </p>
      <p>
        <span className={`${styles.label} ${styles.wind}`}>
          Скорость ветра:
        </span>
        <span className={styles.value}>{data.current.wind_kph} км/ч</span>
      </p>
      <img src={data.current.condition.icon} alt="Weather Icon" />
    </div>
  );
}
