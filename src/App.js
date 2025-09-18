import {useState} from "react";
import { useEffect } from "react";
import './App.css';
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
//api_key is 23e3000182e0f69a1d01a58bf178f457
function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("")

  const API_KEY = "23e3000182e0f69a1d01a58bf178f457"; 

  const fetchWeatherByCity = (city) =>{
     fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
       .then((data) => {
        if (data.cod === 200) {
          // Convert timestamp to readable time & day
          const date = new Date(data.dt * 1000);
          const timeString = date.toLocaleString("en-GB", {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
          });

          setWeather({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            time: timeString,
          });
          setCity(data.name);
        } else {
          setWeather(null);
          alert("City not found ❌");
        }
      })
      .catch((error) => console.error("Error fetching weather:", error));
  }

    const fetchWeatherByCoords = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        const date = new Date(data.dt * 1000);
        const timeString = date.toLocaleString("en-GB", {
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
        });

        setWeather({
          city: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description,
          feelsLike: data.main.feels_like,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          time: timeString,
        });
        setCity(data.name);
      })
      .catch((error) => console.error("Error fetching weather:", error));
  };

  useEffect(() => {
    // Fetch weather data when the component loads
     if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // fallback city if user denies location
          fetchWeatherByCity("London");
        }
      );
    } else {
      // fallback if geolocation not supported
      fetchWeatherByCity("London");
    }
  }, []);

  return (
    <div className="app-container">
      <Header/>
      <SearchBox onSearch={fetchWeatherByCity}/>
      {weather ? (
        <WeatherCard
          city={weather.city}
          time = {weather.time}
          temperature={weather.temperature}
          description={weather.description}
          feelsLike = {weather.feelsLike}
          humidity = {weather.humidity}
          wind = {weather.wind}
        />
      ) : (
        <p>No weather data</p>
      )}
    </div>

  );
}

export default App;
