import { useEffect } from "react";
import Forecast from "../Forecast/Forecast";
import styles from "./Tabs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchWeather } from "../../store/slices/weatherSlice";
import { setIsCityChanged } from "../../store/slices/flagsSlice";

interface TabsProps {
  activeTab: "3days" | "7days" | "14days";
  setActiveTab: (tab: "3days" | "7days" | "14days") => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const dispatch = useDispatch<AppDispatch>();
  const currentCity = useSelector(
    (state: RootState) => state.weather.data?.location?.name
  );
  const isCityChanged = useSelector(
    (state: RootState) => state.flags.isCityChanged
  );

  useEffect(() => {
    if (currentCity && !isCityChanged) {
      dispatch(fetchWeather({ city: currentCity, days: parseInt(activeTab) }));
    }

    if (isCityChanged) {
      dispatch(setIsCityChanged(false));
    }
  }, [activeTab]);

  const handleTabChange = (tab: "3days" | "7days" | "14days") => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  const { forecast } = useSelector((state: RootState) => state.weather);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        <button
          className={`${activeTab === "3days" ? styles.active : ""} ${
            isDarkMode ? styles.dark : styles.light
          }`}
          onClick={() => handleTabChange("3days")}
        >
          3 дня
        </button>
        <button
          className={`${activeTab === "7days" ? styles.active : ""} ${
            isDarkMode ? styles.dark : styles.light
          }`}
          onClick={() => handleTabChange("7days")}
        >
          7 дней
        </button>
        <button
          className={`${activeTab === "14days" ? styles.active : ""} ${
            isDarkMode ? styles.dark : styles.light
          }`}
          onClick={() => handleTabChange("14days")}
        >
          14 дней
        </button>
      </div>

      {forecast?.forecastday && (
        <div className={styles.tabContent}>
          {activeTab === "3days" && <Forecast days={3} />}
          {activeTab === "7days" && <Forecast days={7} />}
          {activeTab === "14days" && <Forecast days={14} />}
        </div>
      )}
    </div>
  );
}
