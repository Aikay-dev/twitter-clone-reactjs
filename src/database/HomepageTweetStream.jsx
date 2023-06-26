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
import { off, onChildChanged, ref, get, onValue } from "firebase/database";
import { realTimeDatabase } from "../config/firebase";
import Loader from "../pages/auth/components/Loader";

library.add(fas);
library.add(fab);
library.add(far);

const HomepageTweetStream = ({
  dispatchNewTweets,
  newtweetsbuttonAnimation,
  setnewtweetsbuttonAnimation,
  tweetLoaded,
  setTweetLoaded,
  setloadMoreTweets,
  loadMoreTweets
}) => {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previousupdateflag, setpreviousupdateflag] = useState("");

  useEffect(() => {
    setIsLoading(true);
    loadInitialTweets();

    return () => {
      // Unsubscribe from the Firebase listener
      const tweetPoolRef = ref(realTimeDatabase, "tweetPool");
      off(tweetPoolRef);
    };
  }, []);

  useEffect(() => {
    if(loadMoreTweets){
      loadNextTweets()
    }
  }, [loadMoreTweets])

  useEffect(() => {
    loadInitialTweets();
  }, [dispatchNewTweets]);

  // Function to load initial tweets

  const loadInitialTweets = () => {
    const tweetPoolRef = ref(realTimeDatabase, "tweetPool");

    return new Promise((resolve, reject) => {
      get(tweetPoolRef)
        .then((snapshot) => {
          const tweetPoolData = snapshot.val();
          const tweetKeys = Object.keys(tweetPoolData);
          const sortedKeys = tweetKeys.sort((a, b) => {
            return tweetPoolData[a].timestamp - tweetPoolData[b].timestamp;
          });
          const last20Keys = sortedKeys.slice(-20);
          const initialTweets = last20Keys
            .map((key) => tweetPoolData[key])
            .reverse();
          setTweets(initialTweets);
          setIsLoading(false);
          console.log(tweets);
          setTweetLoaded(true);
          UpdateListener();
        })
        .catch(reject);
    });
  };

  let lastFetchedKey = tweets[19];

  const loadNextTweets = () => {
    const tweetPoolRef = ref(realTimeDatabase, "tweetPool");

    return new Promise((resolve, reject) => {
      get(tweetPoolRef)
        .then((snapshot) => {
          const tweetPoolData = snapshot.val();
          const tweetKeys = Object.keys(tweetPoolData);
          const sortedKeys = tweetKeys.sort((a, b) => {
            return tweetPoolData[a].timestamp - tweetPoolData[b].timestamp;
          });

          // Check if there are more tweets to fetch
          if (lastFetchedKey) {
            const startIndex = sortedKeys.indexOf(lastFetchedKey) + 1;
            const next20Keys = sortedKeys.slice(startIndex, startIndex + 20);
            const nextTweets = next20Keys
              .map((key) => tweetPoolData[key])
              .reverse();
            setTweets((prevTweets) => [...prevTweets, ...nextTweets]);
            console.log(nextTweets);
          } else {
            console.log("No more tweets to fetch.");
          }

          // Set the last fetched key to the latest key fetched
          lastFetchedKey = sortedKeys[sortedKeys.length - 1];

          resolve();
        })
        .catch(reject);
    });
  };

  function UpdateListener() {
    let previousLength = 0; // Variable to store the previous length
    let lengthIncreases = 0; // Variable to count the number of length increases

    const tweetPoolRef = ref(realTimeDatabase, "tweetPool");
    onValue(tweetPoolRef, (snapshot) => {
      const tweetPoolData = snapshot.val();
      const tweetKeys = Object.keys(tweetPoolData);
      const currentLength = tweetKeys.length;

      if (currentLength > previousLength) {
        lengthIncreases++; // Increment the count of length increases
        console.log("Length increased:", currentLength);

        if (lengthIncreases === 3) {
          console.log("supper dupa doooooo");
          setnewtweetsbuttonAnimation(
            "absolute morenewtweetsbutton morenewtweetsbuttonEnterAnimate px-4 py-2 rounded-full"
          );

          // Reset the count of length increases
          lengthIncreases = 0;
        }
      }

      previousLength = currentLength; // Update the previous length
      setpreviousupdateflag(currentLength);
    });
  }

  return (
    <>
      {!isLoading &&
        tweets.map((tweetsItems) => {
          return (
            <React.Fragment key={tweetsItems.tweetId}>
              {
                <div
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
                      <p style={{whiteSpace: 'pre-line'}}>{tweetsItems.tweetText}</p>
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
            </React.Fragment>
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
