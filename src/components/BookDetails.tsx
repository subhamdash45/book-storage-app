import { useState } from "react";
import "../styles/BookDetail.scss";
import { useNavigate } from "react-router-dom";
import { TBook } from "../types";
import { MdBrokenImage as BrokenImage } from "react-icons/md";

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
          <BrokenImage className="posterImage poster" />
        )}
        <h2 className="text">{title}</h2>
        <p className="text">{author}</p>
        <p className="text">{description}</p>
        <p>
          {publicationDate
            ? new Date(publicationDate).toLocaleDateString()
            : "-"}
        </p>
      </div>
    </div>
  );
};
