import React from "react";
import HomeRight from "./Home/HomeRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import TweetStream from "./Home/dataStream/TweetStream";

library.add(fas);
library.add(fab);
library.add(far);

function BookmarksPage() {
  return (
    <>
      <section className="homepage-center h-screen relative overflow-hidden">
        <header className="px-3 py-2 flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold">Bookmarks</p>
            <p className="text-xs bookmarkUserName">@general_ik</p>
          </div>
          <div className="cursor-pointer p-2 bookmarkElips flex justify-center items-center rounded-full">
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
          </div>
        </header>
        <section>
            <TweetStream/>
        </section>
      </section>

      <HomeRight />
    </>
  );
}

export default BookmarksPage;
