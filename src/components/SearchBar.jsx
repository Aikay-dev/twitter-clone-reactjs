import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onValue, ref } from "firebase/database";
import { realTimeDatabase } from "../config/firebase";
import { useNavigate } from "react-router-dom"; // Import useHistory hook

const SearchBar = ({
  currentUser,
  searchPreText,
  setsearchPreText,
  searchPermit,
  setsearchPermit,
  setSearchTweets,
  searchTweets
}) => {
  const searchbarRef = useRef();
  const navigate = useNavigate(); // Initialize history object

  useEffect(() => {
    if (searchPermit && searchPreText.length > 0) {
      const tweetRef = ref(realTimeDatabase, "tweetPool/");
      onValue(tweetRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        console.log(searchPreText);
        const foundTweets = [];

        Object.values(data).forEach((element) => {
          console.log(element.tweetText.split(" "));
          element.tweetText.split(" ").forEach((text) => {
            text === searchPreText ? foundTweets.push(element) : text;
          });
          console.log(foundTweets);
          setSearchTweets(foundTweets)
        });
      });
    }
  }, [searchPreText, searchPermit]);

  useEffect(() => {
    if (searchPermit) {
      console.log("search for: " + searchPreText);
      setsearchPermit(false);
    }
    console.log(searchPreText)
  }, [searchPreText]);

  function handleSearch(e) {
    e.preventDefault();
    setsearchPermit(true);
    console.log(window.location.pathname);
    navigate(`/Home/Search/${searchPreText}`)
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
