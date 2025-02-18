import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import styles from "./Forecast.module.css";
import { useEffect } from "react";
import { fetchWeather } from "../../store/slices/weatherSlice";

interface ForecastProps {
  days: number;
}

export default function Forecast({ days }: ForecastProps) {
  const { data, forecast } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>();

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

  useEffect(() => {
    if (data?.location.name) {
      dispatch(fetchWeather({ city: data.location.name, days }));
    }
  }, [days, dispatch, data?.location?.name]);

  if (!forecast) return null;

  return (
    <div className={styles.forecast}>
      <h3>Количество дней: {days}</h3>
      <div className={styles.forecastList}>
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
