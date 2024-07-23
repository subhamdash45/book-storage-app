import { useState } from "react";
import "../styles/BookDetail.scss";
import { useNavigate } from "react-router-dom";
import { TBook } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

type TBookDetailProps = {
  book: TBook;
};

export const BookDetail: React.FC<TBookDetailProps> = ({ book }) => {
  const navigate = useNavigate();
  const [showPoster, setShowPoster] = useState(true);
  const hidePoster = () => {
    setShowPoster(false);
  };

  const { cover, title, author, description, publicationDate } = book;

  return (
    <div className="book-list-container">
      <div className="header">
        <h1>Book Details</h1>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <div className="book-detail">
        {cover && showPoster ? (
          <img
            src={cover}
            className="posterImage poster"
            alt="book-logo"
            loading={"lazy"}
            onError={hidePoster}
          />
        ) : (
          <FontAwesomeIcon icon={faImage} className="posterImage poster" />
        )}
        <h2>{title}</h2>
        <p>{author}</p>
        <p>{description}</p>
        <p>
          {publicationDate
            ? new Date(publicationDate).toLocaleDateString()
            : "-"}
        </p>
      </div>
    </div>
  );
};
