// src/components/WeatherSearch.js
import React, { useState } from "react";
import WeatherDisplay from "./WeatherDisplay";
import { fetchWeatherData } from "../weatherAPI";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [unit, setUnit] = useState("metric");

  const handleSearch = async () => {
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      setRecentSearches((prev) => [...new Set([city, ...prev])].slice(0, 5));
      setCity("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}>
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>
      <WeatherDisplay data={weatherData} unit={unit} />
      <div>
        <h3>Recent Searches:</h3>
        {recentSearches.map((search, index) => (
          <p key={index}>{search}</p>
        ))}
      </div>
    </div>
  );
};

export default WeatherSearch;
