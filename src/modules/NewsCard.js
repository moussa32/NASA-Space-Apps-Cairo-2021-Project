import React from "react";
import ReactTimeAgo from "react-time-ago";
import { RiTimeFill } from "react-icons/ri";
import { FiExternalLink } from "react-icons/fi";
import { BsFillImageFill } from "react-icons/bs";

const NewsCard = ({
  id,
  thumbnail,
  title,
  authorImage,
  author,
  description,
  articleLink,
  timestamp,
}) => {
  return (
    <div className="card mb-3" key={id}>
      <div className="row g-0">
        <div className="col-md-4">
          {thumbnail ? (
            <img src={thumbnail} className="img-fluid rounded-start d-block mx-auto" alt={title} />
          ) : (
            <BsFillImageFill size={"3rem"} className="mx-auto d-block pt-2" />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <small className="mb-2 text-muted d-flex align-items-center">
              <img src={authorImage} width={24} height={24} alt={author} className="me-2" />
              {author}
            </small>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted d-flex align-items-center">
                <RiTimeFill className="me-2" size={"1rem"} /> Publiched:
                <ReactTimeAgo className="ms-1" date={Date.parse(timestamp)} locale="en-US" />
              </small>
            </p>
            <div className="d-grid gap-2">
              <a
                variant="second"
                className="btn btn-second btn-md d-flex align-items-center justify-content-center"
                size="md"
                href={articleLink}
              >
                <FiExternalLink className="me-2" /> Read
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
