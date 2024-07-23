import { useState, useEffect } from "react";
import { TBook } from "../types";
import { useNavigate } from "react-router-dom";
import { toggleFavorite, isFavorite } from "../utils/localStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "../styles/BookItem.scss";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useSnackbar } from "notistack";

type TBookItemProps = {
  book: TBook;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: (id: number, e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const BookItem: React.FC<TBookItemProps> = ({
  book,
  onEdit,
  onDelete,
}) => {
  const [favorite, setFavorite] = useState<boolean>(isFavorite(book.id));
  const navigate = useNavigate();
  const [showPoster, setShowPoster] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const hidePoster = () => {
    setShowPoster(false);
  };

  const handleFavoriteToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleFavorite(book.id);
    const isNowFavorite = isFavorite(book.id);
    setFavorite(isNowFavorite);
    enqueueSnackbar(
      `TBook - ${book.title} has been ${
        isNowFavorite ? "added to" : "removed from"
      } favorites`,
      { variant: "success" },
    );
  };

  useEffect(() => {
    setFavorite(isFavorite(book.id));
  }, [book.id]);

  return (
    <div
      className="card-container"
      onClick={() => navigate(`/book/${book.id}`, { state: { book } })}
    >
      <div className="card">
        {showPoster ? (
          <img
            className="poster"
            src={book.cover}
            alt="book-logo"
            loading={"lazy"}
            onError={hidePoster}
          />
        ) : (
          <FontAwesomeIcon icon={faImage} className="poster" />
        )}

        <div>
          <div className="title">{book.title}</div>
          <div className="button-container">
            <button onClick={handleFavoriteToggle}>
              <FontAwesomeIcon icon={favorite ? solidHeart : regularHeart} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(e);
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(book.id, e);
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
