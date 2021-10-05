import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { getCovidNews } from "../api/NewsApi";
import BottomNavigation from "./Layout/BottomNavigation";
import UserNavbar from "./Layout/UserNavbar";
import NewsCard from "./NewsCard";
import { FaVirus } from "react-icons/fa";

const News = () => {
  const [news, setNews] = useState([]);
  const [isLoadding, setIsLoadding] = useState(true);

  useEffect(() => {
    getCovidNews().then(res => {
      setNews(res.value);
      console.log(res.value);
    });
  }, []);
  return (
    <>
      <UserNavbar />
      <Container className="mt-2 tab-container">
        {news?.map((article, index) => (
          <NewsCard
            key={index}
            thumbnail={article?.image?.thumbnail?.contentUrl}
            title={article?.name}
            authorImage={article?.provider[0]?.image?.thumbnail?.contentUrl}
            author={article?.provider[0]?.name}
            description={article?.description}
            timestamp={article?.datePublished}
            articleLink={article?.url}
          />
        ))}
      </Container>
      <BottomNavigation />
    </>
  );
};

export default News;
