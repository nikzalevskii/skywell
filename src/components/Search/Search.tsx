import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../store/slices/weatherSlice";
import { addQuery, Query } from "../../store/slices/historySlice";
import styles from "./Search.module.css";
import { toggleTheme } from "../../store/slices/themeSlice";
import { AppDispatch, RootState } from "../../store/store";
import { Suggestion, TabType } from "../../types/tabs.type";
import { TAB_DAYS_MAP, TABS } from "../../constants/tabs";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageKeys";
import { fetchCitySuggestions } from "../../services/weatherService";
import { setIsTabChangedBySearch } from "../../store/slices/flagsSlice";

interface SearchProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function Search({ setActiveTab }: SearchProps) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const isPurpleMode = useSelector(
    (state: RootState) => state.theme.isPurpleMode
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (city.length > 2) {
        fetchCitySuggestions(city)
          .then((data) => setSuggestions(data))
          .catch((error) =>
            console.error("Error fetching suggestions:", error)
          );
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [city]);

  const handleSearch = (selectedCity: string) => {
    if (selectedCity) {
      const query: Query = {
        city: selectedCity,
        timestamp: new Date().toISOString(),
      };

      dispatch(setIsTabChangedBySearch(true));
      dispatch(
        fetchWeather({
          city: selectedCity,
          days: TAB_DAYS_MAP[TABS.THREE_DAYS],
        })
      );
      dispatch(addQuery(query));
      setCity("");
      setSuggestions([]);
      setActiveTab(TABS.THREE_DAYS);
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACTIVE_TAB, TABS.THREE_DAYS);
      setTimeout(() => {
        dispatch(setIsTabChangedBySearch(false));
      }, 0);
    }
  };

  return (
    <div
      className={`${styles.search} ${
        isPurpleMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введите название города"
          className={styles.input}
        />
        {suggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSearch(suggestion.name)}
                className={styles.suggestionItem}
              >
                {suggestion.name}, {suggestion.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => handleSearch(city)}
        className={`${styles.button} ${
          isPurpleMode ? styles.dark : styles.light
        }`}
      >
        Поиск
      </button>
      <button
        onClick={() => dispatch(toggleTheme())}
        className={`${styles.button} ${
          isPurpleMode ? styles.dark : styles.light
        }`}
      >
        Cменить тему
      </button>
    </div>
  );
}
