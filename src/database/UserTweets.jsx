import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FaRegCommentDots, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { realTimeDatabase } from "../config/firebase";
import { ref, onValue, off } from "firebase/database";

library.add(fas);
library.add(fab);
library.add(far);

const UserTweets = () => {
  const currentUser = useSelector((state) => state.currUsr.value);
  const [tweetsCardData, settweetsCardData] = useState([]);
  console.log(currentUser);

  useEffect(() => {
    settweetsCardData([]);
    const tweetdata = currentUser.userTweets;
    console.log(tweetdata);
    for (const key in tweetdata) {
      console.log(tweetdata[key]);
      rtdbUsrTwtsRqsts(tweetdata[key]);
    }

    return () => {
      // Unsubscribe from the previous listeners
      for (const key in tweetdata) {
        const tweetDataRef = ref(
          realTimeDatabase,
          `tweetPool/${tweetdata[key]}`
        );
        off(tweetDataRef);
      }
    };
  }, []);

  function rtdbUsrTwtsRqsts(id) {
    const TweetDataref = ref(realTimeDatabase, `tweetPool/${id}`);
    onValue(TweetDataref, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      settweetsCardData((prevData) => [...prevData, data]); // Use functional update to avoid repeated data
    });
  }

  useEffect(() => {
    // Perform actions with the updated tweetsCardData
    console.log(tweetsCardData);
    console.log(tweetsCardData.length);
  }, [tweetsCardData]);

  return (
    <>
      { tweetsCardData.map((item, index) => {
        return (
          <div 
          key={item.tweetId}
            to="/Home/Status"
            className="main-tweet-card w-full relative cursor-pointer flex"
          >
            <div className="mt-3 ml-4 main-tweet-card-first-half">
              <img
                src={item.profilePic}
                alt="user profile image"
                className="rounded-full h-10 w-10 mr-5 cursor-pointer main-card-profile-pic"
              />
            </div>

            <div className="w-full main-tweet-card-second-half">
              <div className="flex justify-between w-full pr-2 mt-3">
                <div className="flex items-center">
                  <p className="main-tweet-card-display-name font-semibold mr-2 whitespace-nowrap flex-wrap ">
                    {item.displayName}
                  </p>
                  <p className="text-sm main-tweet-card-username whitespace-nowrap">
                    {item.username} . {item.tweetDate}
                  </p>
                </div>
                <div className="">
                  <div className="homepage-center-current-trend-more font-bold rounded-full cursor-pointer">
                    <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                  </div>
                </div>
              </div>
              <div className="main-tweet-card-content overflow-x-hidden">
                <p>{item.tweetText}</p>
                {item.tweetImageLink.length > 0 && <img
                  src={item.tweetImageLink}
                  alt=""
                  className="main-tweet-image"
                />}
                <div className="main-tweet-card-user-actions flex w-full pt-2 gap-6 overflow-x-scroll">
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
      })}
    </>
  );
};

export default UserTweets;