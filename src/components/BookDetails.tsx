import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/BookDetail.scss";
import { useSnackbar } from "notistack";
import { useGetBookDetails } from "../hooks/bookDetails";
import { BookDetailSkeletonLoader } from "./skeletalLoaders/BookDetailSkeletonLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useGetBookDetails(String(id));
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [showPoster, setShowPoster] = useState(true);
  const hidePoster = () => {
    setShowPoster(false);
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar("Failed to load book details. Please try again later.", {
        variant: "error",
      });
    }
  }, [error, enqueueSnackbar]);

  if (error) return <div>Error loading book details page</div>;

  return (
    <div className="book-list-container">
      <div className="header">
        <h1>Book Details</h1>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      {isLoading ? (
        <BookDetailSkeletonLoader />
      ) : (
        <div className="book-detail">
          {showPoster ? (
            <img
              src={book?.cover}
              className="posterImage poster"
              alt="book-logo"
              loading={"lazy"}
              onError={hidePoster}
            />
          ) : (
            <FontAwesomeIcon icon={faImage} className="posterImage poster" />
          )}
          <h2>{book?.title}</h2>
          <p>{book?.author}</p>
          <p>{book?.description}</p>
          <p>
            {book?.publicationDate
              ? new Date(book?.publicationDate).toLocaleDateString()
              : "-"}
          </p>
        </div>
      )}
    </div>
  );
};
