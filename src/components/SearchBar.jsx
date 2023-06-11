import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas);
library.add(fab);
library.add(far)

const SearchBar = () => {
  return (
    <div className="homepage-header-searchbar w-full">
      <input
        type="text"
        className="homepage-header-searchbox h-10 rounded-full outline-none pl-16"
        placeholder="Search Tweeter"
      />
      <label className="homepage-header-label absolute left-28 top-5 outline-none">
        <FontAwesomeIcon icon="fas fa-magnifying-glass" />
      </label>
    </div>
  );
};

export default SearchBar;
