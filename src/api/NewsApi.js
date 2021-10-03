import axios from "axios";
const newsBaseURL =
  "https://bing-news-search1.p.rapidapi.com/news/search?q=covid19&setLang=en&count=20";

const newsHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "93dd480e40msh0ff347350404c42p13cff4jsn8f57827f891f",
};

export const getCovidNews = async () => {
  const res = await axios.get(newsBaseURL, {
    headers: {
      ...newsHeaders,
    },
  });
  return res.data;
};
