import React from "react";
import Login from "./Login";
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
        <form
          action=""
          className="auth-form bg-black md:mx-auto md:w-authxlw md:h-authxlh p-2 md:rounded-2xl relative h-screen w-full"
        >
          <div className="top-of-auth flex">
            <Link to = "/" className="ex flex justify-center items-center cursor-pointer rounded-full">
              <FontAwesomeIcon icon="fas fa-xmark " />
            </Link>
            <div className="bird absolute right-1/2 text-3xl">
              <FontAwesomeIcon icon="fab fa-twitter" />
            </div>
          </div>
          <Outlet />
        </form>
      </div>
    </>
  );
};

export default Authentication;
