import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas);
library.add(fab);
library.add(far);

const Home = () => {
  return (
    <div>
      <header>
        <p>Home</p>
        <div>
          <button>For you</button>
          <button>Following</button>
        </div>
      </header>
      <section>
        <div>
          <div>
            <img src="" alt="" />
          </div>
          <input type="text" placeholder="What's happening?" />
        </div>
        <div>
          <div>
            <div>
              <FontAwesomeIcon icon="fa-regular fa-image" />
            </div>
            <div>
              <FontAwesomeIcon icon="fa-regular fa-calendar-days" />
            </div>
          </div>
          <button>Tweet</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
