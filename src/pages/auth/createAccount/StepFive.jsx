import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

library.add(fas);
library.add(fab);
library.add(far);

const StepFive = () => {
  return (
    <div>
      <div className="flex items-center ">
        <Link
          onClick={() => {
            dispatch(blurChangeState({ display: "none" }));
          }}
          to="/Home/Explore"
          className="ex flex justify-center items-center cursor-pointer rounded-full"
        >
          <FontAwesomeIcon icon="fas fa-xmark " />
        </Link>
        <p className="ml-8 font-bold text-lg">Step 5 of 5</p>        
      </div>
    </div>
  )
}
export default StepFive
