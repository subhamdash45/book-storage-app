import React from "react";
import "../../styles/SkeletonLoader.scss";

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-poster"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-button"></div>
    </div>
  );
};
