import React, { useState, useEffect } from "react";
import { BookItem } from "../components/BookItem";
import { Pagination } from "../components/Pagination";
import { useSnackbar } from "notistack";
import { BookForm } from "../components/BookForm";
import { Book } from "../types";
import { Modal } from "../components/Modal";
import "../styles/BookList.scss";
import { useGetBooks } from "../hooks/bookDetails";
import { booksPerPage } from "../constants/books";
import { SkeletonLoader } from "./skeletalLoaders/SkeletonLoader";

const BookList: React.FC = () => {
  const { data, isLoading, error } = useGetBooks();
  const [localBooks, setLocalBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar("Failed to load books. Please try again later.", {
        variant: "error",
      });
    } else if (data) {
      setAllBooks([...data, ...localBooks]);
    }
  }, [data, error, enqueueSnackbar, localBooks]);

  useEffect(() => {
    setAllBooks([...(data || []), ...localBooks]);
  }, [localBooks, data]);

  const handleAddBook = (newBook: Book) => {
    setLocalBooks([...localBooks, newBook]);
  };

  const handleEditBook = (updatedBook: Book) => {
    if (updatedBook.id < 0) {
      // Update local book
      setLocalBooks(
        localBooks.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        )
      );
    } else {
      // Update API book
      setAllBooks(
        allBooks.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        )
      );
    }
    setEditingBook(null);
  };

  const handleDeleteBook = (id: number) => {
    if (id < 0) {
      // Delete local book
      setLocalBooks(localBooks.filter((book) => book.id !== id));
    } else {
      // Delete API book
      setAllBooks(allBooks.filter((book) => book.id !== id));
    }
  };

  const handleOpenModal = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const paginatedBooks = allBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  if (error) return <div>Error loading books list page</div>;

  return (
    <div className="book-list-container">
      <div className="header">
        <h1>Book List</h1>
        <button onClick={handleOpenModal}>Add Book</button>
      </div>
      {isLoading ? (
        <div className="book-list">
          {Array.from({ length: booksPerPage }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : (
        <>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <BookForm
              onAddBook={handleAddBook}
              onEditBook={handleEditBook}
              editingBook={editingBook}
              onClose={handleCloseModal}
            />
          </Modal>
          <div className="book-list">
            {paginatedBooks.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                onEdit={(e) => {
                  e.stopPropagation();
                  handleEdit(book);
                }}
                onDelete={(bookId, e) => {
                  e.stopPropagation();
                  handleDeleteBook(bookId);
                }}
              />
            ))}
          </div>
          <Pagination
            totalItems={allBooks.length}
            itemsPerPage={booksPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default BookList;
