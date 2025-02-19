import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "../../constants/api";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageKeys";

interface WeatherState {
  data: any;
  forecast: any;
  loading: boolean;
  error: string | null;
}

const loadWeatherFromLocalStorage = (): any => {
  const storedWeather = localStorage.getItem(LOCAL_STORAGE_KEYS.WEATHER);
  return storedWeather ? JSON.parse(storedWeather) : null;
};

const initialState: WeatherState = {
  data: loadWeatherFromLocalStorage()?.current || null,
  forecast: loadWeatherFromLocalStorage()?.forecast || null,
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
    const currentDays = state.weather.forecast?.forecastday?.length || 0;
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
      const currentResponse = await axios.get(
        `${WEATHER_API_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`
      );

      const forecastResponse = await axios.get(
        `${WEATHER_API_BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=${days}&aqi=no`
      );
      const weatherData = {
        current: currentResponse.data,
        forecast: forecastResponse.data.forecast,
      };

      localStorage.setItem("weather", JSON.stringify(weatherData));

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
