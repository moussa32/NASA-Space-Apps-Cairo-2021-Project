import axios from "axios";

export const getWeather = async apiKey => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=Cairo&appid=${apiKey}`
  );
  return res.data;
};
