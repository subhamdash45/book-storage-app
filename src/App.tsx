import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { BookList } from "./components/BookList";
import { BookDetailWrapper } from "./components/BookDetailWrapper";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetailWrapper />} />
        <Route path="*" element={<Navigate to="/books" />} />
      </Routes>
    </Router>
  );
};
