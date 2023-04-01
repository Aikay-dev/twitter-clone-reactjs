import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

library.add(fas);
library.add(fab);
library.add(far);

const Authentication = () => {
  return (
    <>
      <div className="authentication h-screen md:pt-8 pt-0 flex justify-center items-center ">
        <Outlet />
      </div>
    </>
  );
};

export default Authentication;
