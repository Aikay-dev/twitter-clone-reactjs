import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"; // Import useHistory hook

const SearchBar = ({ currentUser }) => {
  const [searchPreText, setsearchPreText] = useState("");
  const searchbarRef = useRef();
  const navigate = useNavigate(); // Initialize history object

  useEffect(() => {
    const path = window.location.pathname;
    const pathArray = path.split("/");
    if(pathArray.indexOf("Search") !== -1) {
      const lastWord = pathArray[pathArray.length - 1];
      const uncodedString = decodeURIComponent(lastWord);
      setsearchPreText(uncodedString); 
    }
    
  }, []);
  function handleSearch(e) {
    e.preventDefault();
    navigate(`/Home/Search/${searchPreText}`);
  }

  return (
    <div className="homepage-header-searchbar relative w-full">
      <input
        ref={searchbarRef}
        value={searchPreText}
        onChange={(e) => setsearchPreText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e);
          }
        }}
        type="text"
        className="homepage-header-searchbox h-10 rounded-full outline-none pl-16"
        placeholder="Search Tweeter"
      />

      <label
        className={
          currentUser === null
            ? "homepage-header-label absolute left-5 top-2 outline-none"
            : "homepage-header-label absolute left-5 top-2 outline-none"
        }
      >
        <FontAwesomeIcon icon="fas fa-magnifying-glass" />
      </label>
    </div>
  );
};

export default SearchBar;
