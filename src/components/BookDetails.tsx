import React from "react";
import "../styles/BookDetail.scss";
import { useNavigate } from "react-router-dom";
import { Book } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface BookDetailProps {
  book: Book;
}

export const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const navigate = useNavigate();

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
        {cover ? (
          <img
            src={cover}
            className="posterImage poster"
            alt="book-logo"
            loading={"lazy"}
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
