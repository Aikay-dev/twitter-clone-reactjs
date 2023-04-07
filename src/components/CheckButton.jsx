import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas);
library.add(fab);
library.add(far);

const CheckButton = () => {
  return (
    <div className="custom-checkbox flex justify-center items-center p-2 rounded-full cursor-pointer">
      <div className="personalization-and-data-person-ad-check h-5 w-5 flex items-center justify-center text-sm">
        <FontAwesomeIcon icon="fa-solid fa-check" />
      </div>
    </div>
  );
};

export default CheckButton;
