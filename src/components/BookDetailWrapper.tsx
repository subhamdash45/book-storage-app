import { useLocation, useNavigate } from "react-router-dom";
import { TBook } from "../types";
import { BookDetail } from "./BookDetails";

export const BookDetailWrapper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const book: TBook | undefined = location.state?.book;

  if (!book) {
    navigate("/books");
    return null;
  }

  return <BookDetail book={book} />;
};
