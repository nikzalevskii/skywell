import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageKeys";
import {
  fetchCurrentWeather,
  fetchForecastWeather,
} from "../../services/weatherService";
import { Forecast, WeatherData } from "../../types/tabs.type";

interface WeatherState {
  data: WeatherData | null;
  forecast: Forecast | null;
  loading: boolean;
  error: string | null;
}

const loadWeatherFromLocalStorage = (): any => {
  const storedWeather = localStorage.getItem(LOCAL_STORAGE_KEYS.WEATHER);
  return storedWeather ? JSON.parse(storedWeather) : null;
};

const initialState: WeatherState = {
  data: loadWeatherFromLocalStorage()?.current ?? null,
  forecast: loadWeatherFromLocalStorage()?.forecast ?? null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (
    { city, days }: { city: string; days: number },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const currentCity = state.weather.data?.location?.name;
    const currentDays = state.weather.forecast?.forecastday?.length ?? 0;
    if (
      currentCity?.toLowerCase() === city.toLowerCase() &&
      currentDays === days
    ) {
      return {
        current: state.weather.data,
        forecast: state.weather.forecast,
      };
    }
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecastWeather(city, days),
      ]);
      const weatherData = {
        current: currentResponse,
        forecast: forecastResponse,
      };

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.WEATHER,
        JSON.stringify(weatherData)
      );

      return weatherData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to fetch weather"
      );
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.current;
        state.forecast = action?.payload?.forecast;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
