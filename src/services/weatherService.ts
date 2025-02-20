import axios from "axios";
import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "../constants/api";

// Получение предложений для поиска города
export const fetchCitySuggestions = async (query: string) => {
  try {
    const response = await axios.get(
      `${WEATHER_API_BASE_URL}/search.json?key=${WEATHER_API_KEY}&q=${query}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching city suggestions:", error);
    throw new Error(
      error.response?.data?.error?.message || "Failed to fetch suggestions"
    );
  }
};

// Получение текущей погоды
export const fetchCurrentWeather = async (city: string) => {
    try {
      const response = await axios.get(
        `${WEATHER_API_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching current weather:", error);
      throw new Error(error.response?.data?.error?.message || "Failed to fetch current weather");
    }
  };
  
  // Получение прогноза погоды
  export const fetchForecastWeather = async (city: string, days: number) => {
    try {
      const response = await axios.get(
        `${WEATHER_API_BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=${days}&aqi=no`
      );
      return response.data.forecast;
    } catch (error: any) {
      console.error("Error fetching forecast weather:", error);
      throw new Error(error.response?.data?.error?.message || "Failed to fetch forecast weather");
    }
  };
