import React from "react";
import "../../styles/BookDetailSkeletonLoader.scss";

export const BookDetailSkeletonLoader: React.FC = () => {
  return (
    <div className="skeleton-book-detail">
      <div className="skeleton skeleton-cover"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-author"></div>
      <div className="skeleton skeleton-description"></div>
      <div className="skeleton skeleton-description"></div>
      <div className="skeleton skeleton-date"></div>
    </div>
  );
};
