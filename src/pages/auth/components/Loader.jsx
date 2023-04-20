import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas);
library.add(fab);
library.add(far);

const Loader = () => {
  return (
    <div className=" h-full flex justify-center items-center">
      <div className="loadingio-spinner-rolling-clkv9s806ok ">
        <div className="ldio-02vutb3eyc03">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
