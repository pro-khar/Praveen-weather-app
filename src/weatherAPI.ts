// src/api/weatherAPI.js
const API_KEY = "10f7437adb2c662e1f171bc84b9bb881";

export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("City not found");
    return await response.json();
  } catch (error) {
    throw error;
  }
};
