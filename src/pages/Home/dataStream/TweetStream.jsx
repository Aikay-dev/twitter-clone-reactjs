import React from 'react'
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
    <div className="main-tweet-card w-full relative cursor-pointer">
              <div className="m ml-5 mt-3 flex">
                <div>
                  <img
                    src="https://picsum.photos/200/300"
                    alt="user profile image"
                    className="rounded-full h-14 w-14 mr-5 cursor-pointer"
                  />
                </div>
                <div className="flex justify-between w-full pr-2">
                  <div className="flex">
                    <p className="main-tweet-card-display-name font-semibold mr-2 ">
                      Elon Musk
                    </p>
                    <p className="text-sm main-tweet-card-username">
                      @elonmusk . Apr 22
                    </p>
                  </div>
                  <div>
                    <div className="homepage-center-current-trend-more mb-9 font-bold rounded-full cursor-pointer">
                      <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-tweet-card-holder absolute">
                <img
                  src="https://pbs.twimg.com/media/FuWY7lpX0AAu-LH?format=jpg&name=small"
                  alt=""
                  className="main-tweet-image"
                />
              </div>
              <div className="main-tweet-card-user-actions absolute flex w-full ml-24 gap-6">
                <Link className="flex gap-3 items-center">
                  <FaRegCommentDots />
                  <span>19.3k</span>
                </Link>
                <Link className="flex gap-3 items-center">
                  <FaRetweet />
                  <span>52k</span>
                </Link>
                <Link className="flex gap-3 items-center">
                  <AiOutlineHeart />
                  <span>518.1k</span>
                </Link>
                <Link className="flex gap-3 items-center">
                  <BiTrendingUp />
                  <span>30.7M</span>
                </Link>
              </div>
            </div>
  )
}

export default TweetStream