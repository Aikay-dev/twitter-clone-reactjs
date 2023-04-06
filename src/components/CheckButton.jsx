import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

library.add(fas);
library.add(fab);
library.add(far);

const CheckButton = () => {
  return (
    <div className="personalization-and-data-person-ad-check h-5 w-5 flex items-center justify-center text-sm">
      <FontAwesomeIcon icon="fa-solid fa-check" />
    </div>
  );
};

export default CheckButton;
