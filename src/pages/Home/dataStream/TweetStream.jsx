import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FaRegCommentDots } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { Link } from "react-router-dom";

library.add(fas);
library.add(fab);
library.add(far);

const TweetStream = () => {
  return (
    <div className="main-tweet-card w-full relative cursor-pointer flex">
      <div className="mt-3 ml-4">
        <img
          src="https://picsum.photos/200/300"
          alt="user profile image"
          className="rounded-full h-14 w-14 mr-5 cursor-pointer"
        />
      </div>

      <div className="w-full">
        <div className="flex justify-between w-full pr-2 mt-3">
          <div className="flex ">
            <p className="main-tweet-card-display-name font-semibold mr-2 ">
              Elon Musk
            </p>
            <p className="text-sm main-tweet-card-username">
              @elonmusk . Apr 22
            </p>
          </div>
          <div className="">
            <div className="homepage-center-current-trend-more font-bold rounded-full cursor-pointer">
              <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
            </div>
          </div>
        </div>
        <div className="main-tweet-card-content">
          <p>hello world</p>
          <img
          src="https://pbs.twimg.com/media/FuWY7lpX0AAu-LH?format=jpg&name=small"
          alt=""
          className="main-tweet-image"
        />
          <div className="main-tweet-card-user-actions flex w-full pt-2 gap-6">
            <Link
              className="flex gap-3 items-center main-tweet-comment-icon"
              aria-label="Comments"
            >
              <div className="p p-1.5 rounded-full main-comment-icon-surround">
                <FaRegCommentDots />
              </div>
              <span>19.3k</span>
            </Link>
            <Link
              className="flex gap-3 items-center main-tweet-retweet-icon"
              aria-label="Retweets"
            >
              <div className="p p-1.5 rounded-full main-retweet-icon-surround">
                <FaRetweet />
              </div>
              <span>52k</span>
            </Link>
            <Link
              className="flex gap-3 items-center main-tweet-like-icon"
              aria-label="Likes"
            >
              <div className="p p-1.5 rounded-full main-like-icon-surround">
                <AiOutlineHeart />
              </div>
              <span>518.1k</span>
            </Link>
            <Link
              className="flex gap-3 items-center main-tweet-trend-icon"
              aria-label="Trend"
            >
              <div className="p p-1.5 rounded-full main-trend-icon-surround">
                <BiTrendingUp />
              </div>
              <span>30.7M</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetStream;
