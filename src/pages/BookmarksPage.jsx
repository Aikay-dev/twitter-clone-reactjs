import React from "react";
import HomeRight from "./Home/HomeRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import BookmarkStream from "../database/BookmarkStream";

library.add(fas);
library.add(fab);
library.add(far);

function BookmarksPage() {
  const currentUser = useSelector((state) => state.currUsr.value);
  console.log(currentUser);
  return (
    <>
      <section className="homepage-center h-screen relative overflow-hidden">
        <header className="px-3 bookmarkheader py-2 flex items-center justify-between">
          <div className="flex">
            <div
              className="personalization-and-data-head-nav-arrow-holder flex items-center justify-center cursor-pointer rounded-full h-8 w-8 ml-2 mt-2 mr-8 bookmarkBackArrow"
              onClick={() => window.history.back()}
            >
              <span className="text-base">
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
              </span>
            </div>
            <div>
              <p className="text-xl font-semibold">Bookmarks</p>
              <p className="text-xs bookmarkUserName">{currentUser.username}</p>
            </div>
          </div>
          <div className="cursor-pointer p-2 bookmarkElips flex justify-center items-center rounded-full">
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
          </div>
        </header>
        <section className=" overflow-y-scroll h-screen bookmarkmainsection">
          <BookmarkStream />
          <div className="h-56"></div>
        </section>
      </section>

      <HomeRight />
    </>
  );
}

export default BookmarksPage;
