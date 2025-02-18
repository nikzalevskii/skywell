import { useState } from "react";
import Forecast from "../Forecast/Forecast";
import styles from "./Tabs.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Tabs() {
  const loadActiveTabFromLocalStorage = (): "3days" | "7days" | "14days" => {
    const storedTab = localStorage.getItem("activeTab");
    return storedTab ? (storedTab as "3days" | "7days" | "14days") : "3days";
  };

  const [activeTab, setActiveTab] = useState<"3days" | "7days" | "14days">(
    loadActiveTabFromLocalStorage()
  );

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

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
