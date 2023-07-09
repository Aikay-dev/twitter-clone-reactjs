import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onValue, ref } from "firebase/database";
import { realTimeDatabase } from "../config/firebase";
import { useNavigate } from "react-router-dom"; // Import useHistory hook

const SearchBar = ({
  currentUser,
  setSearchTweets,
  searchTweets,
  setSearchPeople,
  searchExtractText,
}) => {
  const [searchPermit, setsearchPermit] = useState(true);
  const [searchPreText, setsearchPreText] = useState("");
  const searchbarRef = useRef();
  const navigate = useNavigate(); // Initialize history object

  useEffect(() => {
    if (searchExtractText) {
      setsearchPreText(searchExtractText);
    }
  }, [searchExtractText]);
  useEffect(() => {
    if (searchPermit && searchPreText.length > 0) {
      const tweetRef = ref(realTimeDatabase, "tweetPool/");
      onValue(tweetRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        console.log(searchPreText);
        const foundTweets = [];

        Object.values(data).forEach((element) => {
          element.tweetText.split(" ").forEach((text) => {
            text === searchPreText ? foundTweets.push(element) : text;
          });
          console.log(foundTweets);
          if(searchTweets){
            setSearchTweets(foundTweets);
          }
        });
      });
      const userRef = ref(realTimeDatabase, "users/");
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const foundUser = [];

        Object.values(data).forEach((element) => {
          const regexDN = new RegExp(
            element.displayName.replace(/\s/g, "").toLowerCase(),
            "i"
          );
          const regexUN = new RegExp(
            element.username.replace(/\s/g, "").toLowerCase(),
            "i"
          );

          const sanitizedSearchPreText = searchPreText
            .replace(/\s/g, "")
            .toLowerCase();

          if (
            regexDN.test(sanitizedSearchPreText) ||
            regexUN.test(sanitizedSearchPreText)
          ) {
            foundUser.push(element);
            console.log(foundUser);
          } else {
            /* console.log(regexDN + " and " + sanitizedSearchPreText);
            console.log("No match");
            console.log(regexDN.test(sanitizedSearchPreText)); */
            const displayName = "Sapa Bro";
            const searchQuery = "sapa";

            const regexDN = new RegExp(
              searchQuery.replace(/\s/g, "").toLowerCase(),
              "i"
            );
            const isMatch = regexDN.test(displayName);

            console.log(isMatch); // Output: true
          }
        });

        console.log(foundUser);
      });
    }else{
      console.log("no search permit")
    }
  }, [searchPreText, searchPermit]);

  useEffect(() => {
    if (searchPermit && searchPreText.length > 0) {
      console.log("search for: " + searchPreText);
      setsearchPermit(false);
    }
    console.log(searchPreText);
  }, [searchPreText]);

  function handleSearch(e) {
    e.preventDefault();
    setsearchPermit(true);
    console.log(window.location.pathname);
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
