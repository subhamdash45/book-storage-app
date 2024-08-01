import { toggleFavorite, isMarkedFavorite } from "../utils/localStorage";
import {
  FaHeart as SolidHeartIcon,
  FaRegHeart as RegularHeartIcon,
  FaEdit as EditIcon,
  FaTrash as DeleteIcon,
} from "react-icons/fa";
import { MdBrokenImage as BrokenImage } from "react-icons/md";
import "../styles/BookItem.scss";
import { useSnackbar } from "notistack";
import { TBook } from "../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TBookItemProps = {
  book: TBook;
  onEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: (id: number, event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const BookItem: React.FC<TBookItemProps> = ({
  book,
  onEdit,
  onDelete,
}) => {
  const [favorite, setFavorite] = useState<boolean>(isMarkedFavorite(book.id));
  const routeChange = useNavigate();
  const [showPoster, setShowPoster] = useState(true);
  const { enqueueSnackbar: snackbar } = useSnackbar();

  const hidePoster = () => {
    setShowPoster(false);
  };

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleFavorite(book.id);
    const isNowFavorite = isMarkedFavorite(book.id);
    setFavorite(isNowFavorite);
    snackbar(
      `Book - ${book.title} has been ${
        isNowFavorite ? "added to" : "removed from"
      } favorites`,
      { variant: "success" },
    );
  };

  useEffect(() => {
    setFavorite(isMarkedFavorite(book.id));
  }, [book.id]);

  return (
    <div
      className="card-container"
      onClick={() => routeChange(`/book/${book.id}`, { state: { book } })}
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
          <BrokenImage className="poster" />
        )}

        <div>
          <div className="title">{book.title}</div>
          <div className="button-container">
            <button onClick={handleFavoriteClick}>
              {favorite ? <SolidHeartIcon /> : <RegularHeartIcon />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(e);
              }}
            >
              <EditIcon />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(book.id, e);
                snackbar(`Book - ${book.title} has been deleted`, {
                  variant: "success",
                });
              }}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
