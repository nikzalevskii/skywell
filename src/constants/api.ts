export const WEATHER_API_BASE_URL = "https://api.weatherapi.com/v1";
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

if (!WEATHER_API_KEY) {
  throw new Error("WEATHER_API_KEY is not defined in environment variables");
}
