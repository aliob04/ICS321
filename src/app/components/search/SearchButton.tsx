'use client';

import React from "react";
import Button from "@/app/components/utils/Button";

const SearchButton = () => {
  const handleSearchClick = () => {
    window.location.href = "/search";
  };

  return (
    <div className="flex justify-center mt-4">
      <Button label="Search for Train" onClick={handleSearchClick} outline />
    </div>
  );
};

export default SearchButton;
