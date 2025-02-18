import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface WeatherState {
  data: any;
  forecast: any;
  loading: boolean;
  error: string | null;
}

const loadWeatherFromLocalStorage = (): any => {
  const storedWeather = localStorage.getItem("weather");
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
        `https://api.weatherapi.com/v1/current.json?key=bb32e1f15a3a4084b80191826251702&q=${city}&aqi=no`
      );

      const forecastResponse = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=bb32e1f15a3a4084b80191826251702&q=${city}&days=${days}&aqi=no`
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
