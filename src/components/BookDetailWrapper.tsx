import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Book } from "../types";
import { BookDetail } from "./BookDetails";

export const BookDetailWrapper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const book: Book | undefined = location.state?.book;

  if (!book) {
    navigate("/books");
    return null;
  }

  return <BookDetail book={book} />;
};
