import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { FaRegCommentDots, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { off, ref, get, onValue } from "firebase/database";
import { realTimeDatabase } from "../config/firebase";
import Loader from "../pages/auth/components/Loader";
import TextComponent from "../components/TextComponent";
import { BsFillPatchCheckFill } from "react-icons/bs";

const HomepageTweetStream = ({
  dispatchNewTweets,
  setnewtweetsbuttonAnimation,
  setTweetLoaded,
  setloadMoreTweets,
  loadMoreTweets,
  tweetCache,
  setTweetCache,
  setReadyForScroll,
  setdispatchNewTweets,
}) => {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(-20);
  const [limitStopper, setlimitStopper] = useState(true);

  useEffect(() => {
    loadInitialTweets();

    return () => {
      // Unsubscribe from the Firebase listener
      const tweetPoolRef = ref(realTimeDatabase, "tweetPool");
      off(tweetPoolRef);
    };
  }, []);

  useEffect(() => {
    if (loadMoreTweets) {
      loadNextTweets();
      setloadMoreTweets(false);
    }
  }, [loadMoreTweets]);

  useEffect(() => {
    if (dispatchNewTweets) {
      loadNewTweets();
      setdispatchNewTweets(false);
    }
  }, [dispatchNewTweets]);

  // Function to load initial tweets

  const loadNewTweets = () => {
    setIsLoading(true);
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
          console.log(initialTweets);
          setIsLoading(false);
          console.log(tweets);
          setTweetLoaded(true);
          UpdateListener();
        })
        .catch(reject);
    });
  };

  const loadInitialTweets = () => {
    if (tweetCache.length < 10) {
      setIsLoading(true);
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
            console.log(initialTweets);
            setIsLoading(false);
            console.log(tweets);
            setTweetLoaded(true);
            UpdateListener();
          })
          .catch(reject);
      });
    } else {
      setTweets(tweetCache);
    }
  };

  useEffect(() => {
    console.log(tweets);
    setTweetCache(tweets);
    setReadyForScroll(true);
  }, [tweets]);

  const loadNextTweets = () => {
    const tweetPoolRef = ref(realTimeDatabase, "tweetPool");

    if (limitStopper) {
      return new Promise((resolve, reject) => {
        get(tweetPoolRef)
          .then((snapshot) => {
            const tweetPoolData = snapshot.val();
            console.log(tweetPoolData);
            const tweetKeys = Object.keys(tweetPoolData);
            const sortedKeys = tweetKeys.sort((a, b) => {
              return tweetPoolData[b].timestamp - tweetPoolData[a].timestamp;
            });

            const dataRtrvDependency =
              Object.keys(tweetPoolData).length + startIndex;
            console.log(dataRtrvDependency);

            if (dataRtrvDependency > 20) {
              const next20Keys = sortedKeys.slice(startIndex - 20, startIndex);
              const nextTweets = next20Keys
                .map((key) => tweetPoolData[key])
                .reverse();
              setTweets((prevTweets) => [...prevTweets, ...nextTweets]);
              console.log(nextTweets);

              // Update the start index for the next batch
              setStartIndex((prevIndex) => prevIndex - 20);
            } else if (dataRtrvDependency < 20) {
              const next20Keys = sortedKeys.slice(0, dataRtrvDependency);
              const nextTweets = next20Keys
                .map((key) => tweetPoolData[key])
                .reverse();
              setTweets((prevTweets) => [...prevTweets, ...nextTweets]);
              console.log(nextTweets);
              setlimitStopper(false);
              // Update the start index for the next batch
              setStartIndex((prevIndex) => prevIndex + dataRtrvDependency);
            }
          })
          .catch(reject);
      });
    }
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
    });
  }

  return (
    <>
      {tweets.length > 1 &&
        !isLoading &&
        tweets.map((tweetsItems) => {
          return (
            <React.Fragment key={tweetsItems.tweetId}>
              {
                <Link
                  to={
                    "/Home/" + tweetsItems.username + "/" + tweetsItems.tweetId
                  }
                  className="main-tweet-card pt-3 w-full relative cursor-pointer flex"
                >
                  {tweetsItems.RetweetedBy ? (
                    <div className="absolute flex gap-2 left-6 justify-center items-center top-0 text-sm retweetedText">
                      <div>
                        <FaRetweet />{" "}
                      </div>
                      <div>{tweetsItems.RetweetedBy} Retweeted</div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className={
                      tweetsItems.RetweetedBy
                        ? "mt-3 ml-4 main-tweet-card-first-half"
                        : "ml-2 main-tweet-card-first-half"
                    }
                  >
                    <img
                      src={tweetsItems.profilePic}
                      alt="user profile image"
                      className="rounded-full h-10 w-10 mr-5 cursor-pointer main-card-profile-pic"
                    />
                  </div>

                  <div className="w-full main-tweet-card-second-half">
                    <div className="flex justify-between w-full pr-2 mt-1">
                      <div className="flex items-center">
                        <p className="main-tweet-card-display-name flex items-center gap-1 font-semibold mr-2 whitespace-nowrap flex-nowrap ">
                          <span>{tweetsItems.displayName}</span>
                          {tweetsItems.badgedUser && (
                            <span className="bluetext">
                              <BsFillPatchCheckFill />
                            </span>
                          )}
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
                      <TextComponent text={tweetsItems.tweetText} />
                      {tweetsItems.tweetImageLink.length > 0 && (
                        <div className="main-tweet-image-border">
                          <img
                            src={tweetsItems.tweetImageLink}
                            alt=""
                            className="main-tweet-image"
                          />
                        </div>
                      )}
                      <div className="main-tweet-card-user-actions flex w-full pt-2 gap-6 overflow-x-scroll">
                        <button
                          className="flex gap-3 items-center main-tweet-comment-icon"
                          aria-label="Comments"
                        >
                          <div className="py-1.5 rounded-full main-comment-icon-surround">
                            <FaRegCommentDots />
                          </div>
                          <span>
                            {Object.keys(tweetsItems.comments).length - 1}
                          </span>
                        </button>
                        <button
                          className="flex gap-3 items-center main-tweet-retweet-icon"
                          aria-label="Retweets"
                        >
                          <div className="py-1.5 rounded-full main-retweet-icon-surround">
                            <FaRetweet />
                          </div>
                          <span>{tweetsItems.retweets.length - 1}</span>
                        </button>
                        <button
                          className="flex gap-3 items-center main-tweet-like-icon"
                          aria-label="Likes"
                        >
                          <div className="py-1.5 rounded-full main-like-icon-surround">
                            <AiOutlineHeart />
                          </div>
                          <span>{tweetsItems.likes.length - 1}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
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
