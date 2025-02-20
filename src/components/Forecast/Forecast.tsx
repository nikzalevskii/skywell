import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./Forecast.module.css";
import Loader from "../Loader/Loader";
import { TABS } from "../../constants/tabs";

interface ForecastProps {
  days: number;
  activeTab: string;
}

export default function Forecast({ days, activeTab }: ForecastProps) {
  const { forecast, loading } = useSelector(
    (state: RootState) => state.weather
  );

  function formatDayOfWeek(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(date);
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "short",
    }).format(date);
  }

  if (loading) {
    return <Loader />;
  }

  if (!forecast) return null;

  return (
    <div className={styles.forecast}>
      <h3>Количество дней: {days}</h3>
      <div
        className={`${styles.forecastList} ${
          activeTab === TABS.THREE_DAYS ? styles.centered : ""
        }`}
      >
        {forecast.forecastday.map((day: any) => (
          <div key={day.date} className={styles.forecastItem}>
            <p className={styles.dayOfWeek}>{formatDayOfWeek(day.date)}</p>
            <p className={styles.date}>{formatDate(day.date)}</p>
            <img
              src={day.day.condition.icon}
              alt="Weather Icon"
              className={styles.weatherIcon}
            />
            <p className={styles.temperatureLabel}>Температура воздуха</p>
            <div className={styles.temperatureRange}>
              <p className={styles.maxTemp}>{day.day.maxtemp_c}°C</p>
              <p className={styles.minTemp}>{day.day.mintemp_c}°C</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
