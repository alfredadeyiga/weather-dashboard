export interface dateTime {
  location: string;
  date: string;
  time: string;
}

export interface astro {
  sunrise: string | undefined;
  sunset: string | undefined;
}

export interface currentWeather {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  condition: string;
  icon: string;
  wind: number;
  humidity: number;
  pressure: number;
  uv: number;
}

export interface dailyWeather {
  date: string;
  temp_c: number;
  temp_f: number;
  icon: string;
}

export interface hourlyWeather {
  time: string;
  temp_c: number;
  temp_f: number;
  icon: string;
  wind_speed: number;
  wind_direction: string;
  condition: string
}

export interface searchResults {
  name: string;
  region: string;
  country: string;
}
