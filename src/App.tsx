import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import BookList from "./components/BookList";
import { BookDetail } from "./components/BookDetails";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/books" />} />
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
};
