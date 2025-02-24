export type TabType = "3days" | "7days" | "14days";


  // Интерфейс для data (текущий день)
  export interface WeatherData {
    location: Location;
    current: Current;
  }

export interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
    localtime_epoch: number;
  }
  
  export interface Condition {
    text: string;
    icon: string;
    code: number;
  }
  
  export interface Current {
    last_updated: string;
    last_updated_epoch: number;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    dewpoint_c: number;
    dewpoint_f: number;
    heatindex_c: number;
    heatindex_f: number;
    windchill_c: number;
    windchill_f: number;
  }
  
  export interface Day {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: Condition; 
    uv: number;
  }
  

  // Интерфейс для Forecast (общий прогноз)
  export interface Forecast {
    forecastday: ForecastDay[];
  }

  // Интерфейс для ForecastDay (прогноз на один день)
  export interface ForecastDay {
    date: string;
    date_epoch: number;
    day: Day;
    astro: Astro;
    hour: Hour[];
  }

  // Интерфейс для элемента suggestions
export interface Suggestion {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
  }
  
  // Интерфейс для Astro (астрономические данные)
  export interface Astro {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
    is_moon_up: number;
    is_sun_up: number;
  }
  
  // Интерфейс для Hour (прогноз по часам)
  export interface Hour {
    time: string;
    time_epoch: number;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: Condition; 
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    vis_km: number;
    vis_miles: number;
    gust_mph: number;
    gust_kph: number;
    uv: number;
  }
  
