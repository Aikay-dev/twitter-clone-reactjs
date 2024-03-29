import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchMounttState } from "../store";

const SearchBar = ({ currentUser, toast }) => {
  const [searchPreText, setsearchPreText] = useState("");
  const searchbarRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const key = useSelector((state) => state.mntSt.value);

  function remount() {
    dispatch(searchMounttState(key + 1));
  }

  useEffect(() => {
    const path = window.location.pathname;
    const pathArray = path.split("/");
    if (pathArray.indexOf("Search") !== -1) {
      const lastWord = pathArray[pathArray.length - 1];
      const uncodedString = decodeURIComponent(lastWord);
      setsearchPreText(uncodedString);
    }
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (currentUser !== null) {
      navigate(`/Home/Search/${searchPreText}`);
    } else {
      toast("Kindly login first", {
        icon: "❗",
      });
    }
    remount();
  }

  return (
    <>
      <div className="homepage-header-searchbar relative w-full">
        <input
          ref={searchbarRef}
          value={searchPreText}
          onChange={(e) => setsearchPreText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e);
              remount();
            }
          }}
          type="text"
          className="homepage-header-searchbox h-10 rounded-full outline-none pl-16"
          placeholder="Search Tweeter"
        />

        <label
          onClick={handleSearch}
          className="homepage-header-label absolute left-5 top-2 outline-none"
        >
          <FontAwesomeIcon icon="fas fa-magnifying-glass" />
        </label>
      </div>
    </>
  );
};

export default SearchBar;
