const WeatherDisplay = ({ data, unit }) => {
  if (!data) return <p>No data available</p>;

  const temperature =
    unit === "metric" ? data.main.temp : (data.main.temp * 9) / 5 + 32;
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  return (
    <div>
      <h2>{data.name}</h2>
      <p>
        Temperature: {temperature.toFixed(1)} {unitSymbol}
      </p>
      <p>Weather: {data.weather[0].description}</p>
      <p>
        Wind Speed: {data.wind.speed} {unit === "metric" ? "m/s" : "mph"}
      </p>
    </div>
  );
};

export default WeatherDisplay;
