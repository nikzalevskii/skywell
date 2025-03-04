import { useEffect } from "react";
import Forecast from "../Forecast/Forecast";
import styles from "./Tabs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchWeather } from "../../store/slices/weatherSlice";
import { TabType } from "../../types/tabs.type";
import { TAB_DAYS_MAP, TABS } from "../../constants/tabs";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageKeys";
import Loader from "../Loader/Loader";

interface TabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const isPurpleMode = useSelector(
    (state: RootState) => state.theme.isPurpleMode
  );

  const dispatch = useDispatch<AppDispatch>();
  const currentCity = useSelector(
    (state: RootState) => state.weather.data?.location?.name
  );

  const isTabChangedBySearch = useSelector(
    (state: RootState) => state.flags.isTabChangedBySearch
  );

  const { forecast, loading } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    if (currentCity && !isTabChangedBySearch) {
      dispatch(
        fetchWeather({ city: currentCity, days: TAB_DAYS_MAP[activeTab] })
      );
    }
  }, [activeTab]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACTIVE_TAB, tab);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        <button
          className={`${activeTab === TABS.THREE_DAYS ? styles.active : ""} ${
            isPurpleMode ? styles.dark : styles.light
          }`}
          onClick={() => handleTabChange(TABS.THREE_DAYS)}
        >
          3 дня
        </button>
        <button
          className={`${activeTab === TABS.SEVEN_DAYS ? styles.active : ""} ${
            isPurpleMode ? styles.dark : styles.light
          }`}
          onClick={() => handleTabChange(TABS.SEVEN_DAYS)}
        >
          7 дней
        </button>
        <button
          className={`${
            activeTab === TABS.FOURTEEN_DAYS ? styles.active : ""
          } ${isPurpleMode ? styles.dark : styles.light}`}
          onClick={() => handleTabChange(TABS.FOURTEEN_DAYS)}
        >
          14 дней
        </button>
      </div>

      {forecast?.forecastday && (
        <div className={styles.tabContent}>
          {activeTab === TABS.THREE_DAYS && (
            <Forecast
              days={TAB_DAYS_MAP[TABS.THREE_DAYS]}
              activeTab={activeTab}
            />
          )}
          {activeTab === TABS.SEVEN_DAYS && (
            <Forecast
              days={TAB_DAYS_MAP[TABS.SEVEN_DAYS]}
              activeTab={activeTab}
            />
          )}
          {activeTab === TABS.FOURTEEN_DAYS && (
            <Forecast
              days={TAB_DAYS_MAP[TABS.FOURTEEN_DAYS]}
              activeTab={activeTab}
            />
          )}
        </div>
      )}
    </div>
  );
}
