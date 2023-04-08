import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { checkboxsettingsChangeState } from "../store";

library.add(fas);
library.add(fab);
library.add(far);

const checkBoxStyle = {
  backgroundColor: "rgb(29, 155, 240)",
};

const CheckButton = () => {
  
  const dispatch = useDispatch();
  const personalcheckbxs = useSelector((state) => state.setchbx.value);
  return (
    <div
      className="custom-checkbox flex justify-center items-center p-2 rounded-full cursor-pointer"
      onClick={() => {
        personalcheckbxs
          ? dispatch(checkboxsettingsChangeState(false))
          : dispatch(checkboxsettingsChangeState(true));
      }}
    >
      <div
        style={
          personalcheckbxs
            ? checkBoxStyle
            : { border: "2px solid rgb(113,118,123)" }
        }
        className="personalization-and-data-person-ad-check h-5 w-5 flex items-center justify-center text-sm"
      >
        {personalcheckbxs && <FontAwesomeIcon icon="fa-solid fa-check" />}
      </div>
    </div>
  );
};

export default CheckButton;
