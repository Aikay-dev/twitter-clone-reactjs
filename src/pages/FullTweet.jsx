import React, { useEffect, useState } from "react";
import HomeRight from "./Home/HomeRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegComment, FaRegCommentDots, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { BiTrendingUp } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { realTimeDatabase } from "../config/firebase";

library.add(fas);
library.add(fab);
library.add(far);

function FullTweet() {
  const [tweetData, settweetData] = useState(null);
  const { timestamp } = useParams();

  console.log(timestamp);

  useEffect(() => {
    const tweetPoolRef = ref(realTimeDatabase, `tweetPool/${timestamp}`);
    onValue(tweetPoolRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      settweetData(data);
    });
  }, []);

  const dispatch = useDispatch();
  return (
    <>
      <section className="homepage-center h-screen relative overflow-hidden">
        <nav className="flex items-center pt-2 absolute w-full top-mobile-nav">
          <div
            className="personalization-and-data-head-nav-arrow-holder flex items-center justify-center cursor-pointer rounded-full h-8 w-8 ml-2 mt-2 mr-8"
            onClick={() => window.history.back()}
          >
            <span className="text-base">
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            </span>
          </div>
          <p className=" font-semibold text-xl">Tweet</p>
        </nav>
        <section className="pt-20 pb-20 homepage-center-info overflow-y-scroll h-full">
          <div className="flex justify-between px-3">
            <div className="flex ">
              <div>
                <img
                  src={tweetData !== null? tweetData.profilePic: ""}
                  alt="user profile image"
                  className="rounded-full h-10 w-10 max-w-14 mr-5 cursor-pointer main-card-profile-pic"
                />
              </div>
              <div>
                <p className=" font-bold">{tweetData !== null? tweetData.displayName: ""}</p>
                <p className="text-sm homelabelcolor">{tweetData !== null? tweetData.username: ""}</p>
              </div>
            </div>
            <button className="ml-4 ellipseinFullTweet flex w-8 h-8 rounded-full justify-center items-center">
              <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
            </button>
          </div>
          <div style={{whiteSpace:"pre-wrap"}} className="px-3 pt-4">
          {tweetData !== null? tweetData.tweetText: ""}
          </div>
          <div className=" mt-5 px-3 fulltweetcardimage justify-center flex items-center">
            <img
              src="https://pbs.twimg.com/media/Fy6_-y4WwAAEso7?format=jpg&name=360x360"
              alt=""
              className="main-tweet-image-tweetfull"
            />
          </div>
          <div className="py-3 px-3 flex gap-2 items-center homelabelcolor">
            <div className=" text-sm ">7:18 PM</div>
            <div className="dotfontawe">
              <FontAwesomeIcon icon="fa-solid fa-circle" />
            </div>
            <div className=" text-sm homelabelcolor">Jun 18, 2023</div>
          </div>
          <div className="flex justify-around items-center homelabelcolor text-xl mx-3 py-1 tweetfullactionsection">
            <div className="p-3 cursor-pointer rounded-full main-tweet-comment-icon main-tweet-comment-icon-background">
              <FaRegComment />
            </div>
            <div className="p-3 cursor-pointer rounded-full main-tweet-retweet-icon main-tweet-retweet-icon-background">
              <FaRetweet />
            </div>
            <div className="p-3 cursor-pointer rounded-full main-tweet-like-icon main-tweet-like-icon-background">
              <AiOutlineHeart />
            </div>
            <div className="p-3 text-lg cursor-pointer rounded-full main-tweet-comment-icon main-tweet-comment-icon-background">
              <BsBookmark />
            </div>
          </div>
          <section>
            <Link
              to="/Home/User/"
              className="main-tweet-card w-full relative cursor-pointer flex"
            >
              <div className="mt-3 ml-4 main-tweet-card-first-half">
                <img
                  src="https://picsum.photos/200/300"
                  alt="user profile image"
                  className="rounded-full h-10 w-10 mr-5 cursor-pointer main-card-profile-pic"
                />
              </div>
              <div className="w-full main-tweet-card-second-half">
                <div className="flex justify-between w-full pr-2 mt-3">
                  <div className="flex items-center">
                    <p className="main-tweet-card-display-name font-semibold mr-2 whitespace-nowrap flex-wrap ">
                      B.O.D
                    </p>
                    <p className="text-sm main-tweet-card-username whitespace-nowrap">
                      @bod_republic · 11h
                    </p>
                  </div>
                  <div className="">
                    <div className="homepage-center-current-trend-more font-bold rounded-full cursor-pointer">
                      <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                    </div>
                  </div>
                </div>
                <div className="main-tweet-card-content overflow-x-hidden">
                  <p>The most common name in Nigeria?</p>

                  <div className="main-tweet-card-user-actions flex w-full pt-2 gap-6 overflow-x-scroll">
                    <button
                      className="flex gap-3 items-center main-tweet-comment-icon"
                      aria-label="Comments"
                    >
                      <div className="p p-1.5 rounded-full main-comment-icon-surround">
                        <FaRegCommentDots />
                      </div>
                      <span>19.3k</span>
                    </button>
                    <button
                      className="flex gap-3 items-center main-tweet-retweet-icon"
                      aria-label="Retweets"
                    >
                      <div className="p p-1.5 rounded-full main-retweet-icon-surround">
                        <FaRetweet />
                      </div>
                      <span>52k</span>
                    </button>
                    <Link
                      className="flex gap-3 items-center main-tweet-like-icon"
                      aria-label="Likes"
                    >
                      <div className="p p-1.5 rounded-full main-like-icon-surround">
                        <AiOutlineHeart />
                      </div>
                      <span>518.1k</span>
                    </Link>
                    <button
                      className="flex gap-3 items-center main-tweet-trend-icon"
                      aria-label="Trend"
                    >
                      <div className="p p-1.5 rounded-full main-trend-icon-surround">
                        <BiTrendingUp />
                      </div>
                      <span>30.7M</span>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        </section>
      </section>

      <HomeRight />
    </>
  );
}

export default FullTweet;
