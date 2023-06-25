import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { FaRegCommentDots, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { off, onValue, ref } from "firebase/database";
import { realTimeDatabase } from "../config/firebase";
import Loader from "../pages/auth/components/Loader";

library.add(fas);
library.add(fab);
library.add(far);

const HomepageTweetStream = () => {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tweetGrabbed, setTweetGrabbed] = useState(false);
  const [tweetrev, setTweetrev] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    loadInitialTweets();

    return () => {
      // Unsubscribe from the Firebase listener
      const tweetPoolRef = ref(realTimeDatabase, "tweetPool");
      off(tweetPoolRef);
    };
  }, []);

  // Function to load initial tweets
  const loadInitialTweets = () => {
    const tweetPoolRef = ref(realTimeDatabase, "tweetPool");
    return new Promise((resolve, reject) => {
      onValue(
        tweetPoolRef,
        (snapshot) => {
          const tweetPoolData = snapshot.val();
          const tweetKeys = Object.keys(tweetPoolData);
          const sortedKeys = tweetKeys.sort((a, b) => {
            // Sort the keys based on the timestamp in descending order
            return tweetPoolData[b].timestamp - tweetPoolData[a].timestamp;
          });
          const initialTweets = sortedKeys
            .map((key) => tweetPoolData[key])
            .slice(0, 20)
            .reverse();
          setTweets(initialTweets);
          setIsLoading(false);
          console.log(initialTweets);

          resolve();
        },
        reject
      );
    });
  };

  return (
    <>
      {!isLoading &&
        tweets.map((tweetsItems) => {
          return (
            <>
              {
                <div
                  key={tweetsItems.tweetId}
                  to="/Home/Status"
                  className="main-tweet-card w-full relative cursor-pointer flex"
                >
                  <div className="mt-3 ml-4 main-tweet-card-first-half">
                    <img
                      src={tweetsItems.profilePic}
                      alt="user profile image"
                      className="rounded-full h-10 w-10 mr-5 cursor-pointer main-card-profile-pic"
                    />
                  </div>

                  <div className="w-full main-tweet-card-second-half">
                    <div className="flex justify-between w-full pr-2 mt-3">
                      <div className="flex items-center">
                        <p className="main-tweet-card-display-name font-semibold mr-2 whitespace-nowrap flex-wrap ">
                          {tweetsItems.displayName}
                        </p>
                        <p className="text-sm main-tweet-card-username whitespace-nowrap">
                          {tweetsItems.username} . {tweetsItems.tweetDate}
                        </p>
                      </div>
                      <div className="">
                        <div className="homepage-center-current-trend-more font-bold rounded-full cursor-pointer">
                          <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                        </div>
                      </div>
                    </div>
                    <div className="main-tweet-card-content overflow-x-hidden">
                      <p>{tweetsItems.tweetText}</p>
                      {tweetsItems.tweetImageLink.length > 0 && (
                        <img
                          src={tweetsItems.tweetImageLink}
                          alt=""
                          className="main-tweet-image"
                        />
                      )}
                      <div className="main-tweet-card-user-actions flex w-full pt-2 gap-6 overflow-x-scroll">
                        <Link
                          className="flex gap-3 items-center main-tweet-comment-icon"
                          aria-label="Comments"
                        >
                          <div className="p p-1.5 rounded-full main-comment-icon-surround">
                            <FaRegCommentDots />
                          </div>
                          <span>{tweetsItems.comments.length - 1}</span>
                        </Link>
                        <Link
                          className="flex gap-3 items-center main-tweet-retweet-icon"
                          aria-label="Retweets"
                        >
                          <div className="p p-1.5 rounded-full main-retweet-icon-surround">
                            <FaRetweet />
                          </div>
                          <span>{tweetsItems.retweets.length - 1}</span>
                        </Link>
                        <Link
                          className="flex gap-3 items-center main-tweet-like-icon"
                          aria-label="Likes"
                        >
                          <div className="p p-1.5 rounded-full main-like-icon-surround">
                            <AiOutlineHeart />
                          </div>
                          <span>{tweetsItems.likes.length - 1}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </>
          );
        })}
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
};

export default HomepageTweetStream;
