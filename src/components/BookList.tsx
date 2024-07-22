import { useState, useEffect } from "react";
import { BookItem } from "../components/BookItem";
import { Pagination } from "../components/Pagination";
import { useSnackbar } from "notistack";
import { BookForm } from "../components/BookForm";
import { Book } from "../interfaces";
import { Modal } from "../components/Modal";
import "../styles/BookList.scss";
import { useGetBooks } from "../hooks/bookDetails";
import { booksPerPage } from "../constants/books";
import { SkeletonLoader } from "./skeletalLoaders/BookListLoader";

interface BookListState {
  localBooks: Book[];
  apiBooks: Book[];
  currentPage: number;
  editingBook: Book | null;
  isModalOpen: boolean;
}

export const BookList: React.FC = () => {
  const { data: apiBooks, isLoading, error } = useGetBooks();
  const [state, setState] = useState<BookListState>({
    localBooks: [],
    apiBooks: [],
    currentPage: 1,
    editingBook: null,
    isModalOpen: false,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar("Failed to load books. Please try again later.", {
        variant: "error",
      });
    } else if (apiBooks) {
      setState((prevState) => ({
        ...prevState,
        apiBooks: apiBooks,
      }));
    }
  }, [apiBooks, error, enqueueSnackbar]);

  const allBooks = [...state.localBooks, ...state.apiBooks];

  const handleAddBook = (newBook: Book) => {
    setState((prevState) => ({
      ...prevState,
      localBooks: [newBook, ...prevState.localBooks],
      currentPage: 1,
    }));
  };

  const handleEditBook = (updatedBook: Book) => {
    if (updatedBook.id < 0) {
      setState((prevState) => ({
        ...prevState,
        localBooks: prevState.localBooks.map((book) =>
          book.id === updatedBook.id ? updatedBook : book,
        ),
        editingBook: null,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        apiBooks: prevState.apiBooks.map((book) =>
          book.id === updatedBook.id ? updatedBook : book,
        ),
        editingBook: null,
      }));
    }
  };

  const handleDeleteBook = (id: number) => {
    if (id < 0) {
      setState((prevState) => ({
        ...prevState,
        localBooks: prevState.localBooks.filter((book) => book.id !== id),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        apiBooks: prevState.apiBooks.filter((book) => book.id !== id),
      }));
    }
  };

  const handleOpenModal = () => {
    setState((prevState) => ({
      ...prevState,
      editingBook: null,
      isModalOpen: true,
    }));
  };

  const handleEdit = (book: Book) => {
    setState((prevState) => ({
      ...prevState,
      editingBook: book,
      isModalOpen: true,
    }));
  };

  const handleCloseModal = () => {
    setState((prevState) => ({
      ...prevState,
      isModalOpen: false,
    }));
  };

  const paginatedBooks = allBooks.slice(
    (state.currentPage - 1) * booksPerPage,
    state.currentPage * booksPerPage,
  );

  const handlePageChange = (page: number) => {
    setState((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  };

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
          <Modal isOpen={state.isModalOpen} onClose={handleCloseModal}>
            <BookForm
              onAddBook={handleAddBook}
              onEditBook={handleEditBook}
              editingBook={state.editingBook}
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
            currentPage={state.currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
