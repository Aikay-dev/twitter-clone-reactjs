import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas);
library.add(fab);
library.add(far);

const Trendstream = () => {
  return (
      <div className="homepage-center-trends ">
        <div className="homepage-center-current-trend px-3 py-3 cursor-pointer flex items-center justify-between">
          <div className="homepage-center-current-trend-info">
            <p className="trend-category text-sm">Music . Trending</p>
            <p className="trend-topic font-bold text-white">Mercy Chinwo</p>
            <p className="trend-tweets-num text-sm">3,875 Tweets</p>
          </div>
          <div className="homepage-center-current-trend-more mb-9 font-bold rounded-full cursor-pointer">
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
          </div>
        </div>
        <div className="homepage-center-current-trend px-3 py-3 cursor-pointer flex items-center justify-between">
          <div className="homepage-center-current-trend-info">
            <p className="trend-category text-sm">Music . Trending</p>
            <p className="trend-topic font-bold text-white">Asiwaju Bola Ahmed Tinubu</p>
            <p className="trend-tweets-num text-sm">11.2k Tweets</p>
          </div>
          <div className="homepage-center-current-trend-more mb-9 font-bold rounded-full cursor-pointer">
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
          </div>
        </div>
        <div className="homepage-center-current-trend px-3 py-3 cursor-pointer flex items-center justify-between">
          <div className="homepage-center-current-trend-info">
            <p className="trend-category text-sm">Music . Trending</p>
            <p className="trend-topic font-bold text-white">Katsina</p>
            <p className="trend-tweets-num text-sm">3,290 Tweets</p>
          </div>
          <div className="homepage-center-current-trend-more mb-9 font-bold rounded-full cursor-pointer">
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
          </div>
        </div>
        <div className="homepage-center-current-trend px-3 py-3 cursor-pointer flex items-center justify-between">
          <div className="homepage-center-current-trend-info">
            <p className="trend-category text-sm">Music . Trending</p>
            <p className="trend-topic font-bold text-white">Yul Edochie</p>
            <p className="trend-tweets-num text-sm">11.3k Tweets</p>
          </div>
          <div className="homepage-center-current-trend-more mb-9 font-bold rounded-full cursor-pointer">
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
          </div>
        </div>
        <div className="homepage-center-current-trend px-3 py-3 cursor-pointer flex items-center justify-between">
          <div className="homepage-center-current-trend-info">
            <p className="trend-category text-sm">Music . Trending</p>
            <p className="trend-topic font-bold text-white">Rest In Peace</p>
            <p className="trend-tweets-num text-sm">29.1k Tweets</p>
          </div>
          <div className="homepage-center-current-trend-more mb-9 font-bold rounded-full cursor-pointer">
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
          </div>
        </div>
      </div>
  );
};

export default Trendstream;
