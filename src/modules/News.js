import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { getCovidNews } from "../api/NewsApi";
import BottomNavigation from "./Layout/BottomNavigation";
import UserNavbar from "./Layout/UserNavbar";
import ReactTimeAgo from "react-time-ago";
import { RiTimeFill } from "react-icons/ri";
import { ImUser } from "react-icons/im";

const News = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    getCovidNews().then(res => {
      setNews(res);
    });
  }, []);
  return (
    <>
      <UserNavbar />
      <Container className="mt-2 tab-container">
        {news?.articles?.map((article, index) => (
          <div className="card mb-3" key={index}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={article?.urlToImage}
                  className="img-fluid rounded-start"
                  alt={article?.title}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{article?.title}</h5>
                  <small className="mb-2 text-muted d-flex align-items-center">
                    <ImUser className="me-2" />
                    {article?.author}
                  </small>
                  <p className="card-text">{article?.description}</p>
                  <p className="card-text">
                    <small className="text-muted d-flex align-items-center">
                      <RiTimeFill className="me-2" size={"1rem"} /> Publiched:{" "}
                      <ReactTimeAgo date={article?.publishedAt} locale="en-US" />
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Container>
      <BottomNavigation />
    </>
  );
};

export default News;
