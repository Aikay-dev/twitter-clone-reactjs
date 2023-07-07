import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas);
library.add(fab);
library.add(far);

const SearchBar = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div className="homepage-header-searchbar relative w-full">
      <input
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
