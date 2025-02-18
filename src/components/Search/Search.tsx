import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../store/slices/weatherSlice";
import { addQuery, Query } from "../../store/slices/historySlice";
import styles from "./Search.module.css";
import { toggleTheme } from "../../store/slices/themeSlice";
import axios from "axios";
import { AppDispatch, RootState } from "../../store/store";

export default function Search() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (city.length > 2) {
        axios
          .get(
            `https://api.weatherapi.com/v1/search.json?key=bb32e1f15a3a4084b80191826251702&q=${city}`
          )
          .then((response) => {
            setSuggestions(response.data);
          })
          .catch((error) => {
            console.error("Error fetching suggestions:", error);
          });
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
      dispatch(fetchWeather({ city: selectedCity, days: 3 }));
      dispatch(addQuery(query));
      setCity("");
      setSuggestions([]);
    }
  };

  return (
    <div
      className={`${styles.search} ${isDarkMode ? styles.dark : styles.light}`}
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
          isDarkMode ? styles.dark : styles.light
        }`}
      >
        Поиск
      </button>
      <button
        onClick={() => dispatch(toggleTheme())}
        className={`${styles.button} ${
          isDarkMode ? styles.dark : styles.light
        }`}
      >
        Cменить тему
      </button>
    </div>
  );
}
