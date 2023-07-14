import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegCommentDots, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { realTimeDatabase } from "../config/firebase";
import { ref, onValue } from "firebase/database";
import TextComponent from "../components/TextComponent";
import { BsFillPatchCheckFill } from "react-icons/bs";
import Loader from "../pages/auth/components/Loader";

const FollowingTweets = ({
  setReadyForScroll,
  setFollowingTweetsCache,
  followingTweetsCache,
}) => {
  const currentUser = useSelector((state) => state.currUsr.value);
  console.log(currentUser.followingNumber[0] === 0);
  const [tweetsCardData, settweetsCardData] = useState([]);
  console.log(currentUser);
  const [tweetIds, settweetIds] = useState([]);
  const [loadingTweets, setloadingTweets] = useState(true);
  const [noTweets, setnoTweets] = useState(false);

  useEffect(() => {
    const userTogetDataFrom = currentUser.followingNumber;
    if (followingTweetsCache.length === 0) {
      if (userTogetDataFrom.length === 1 && userTogetDataFrom[0] === 0) {
        setnoTweets(true);
        setloadingTweets(false);
        console.log("not loadingTweets");
        console.log("userTogetDataFrom : " + currentUser.followingNumber);
      } else {
        for (let i = 0; i < userTogetDataFrom.length; i++) {
          const TweetDataref = ref(
            realTimeDatabase,
            `users/${userTogetDataFrom[i]}`
          );
          onValue(TweetDataref, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            console.log(i);
            const tweetsObj = data.userTweets;
            const tweets = Object.values(tweetsObj);
            settweetIds(tweets);
          });
        }
        console.log("done getting tweets");
        console.log(tweetIds);
        setloadingTweets(false);
      }
    } else {
      settweetsCardData(followingTweetsCache);
      setloadingTweets(false);
    }
  }, []);

  useEffect(() => {
    console.log(tweetIds);
    rtdbUsrTwtsRqsts(tweetIds);
  }, [tweetIds]);

  function rtdbUsrTwtsRqsts(id) {
    id.forEach((element) => {
      const TweetDataref = ref(realTimeDatabase, `tweetPool/${element}`);
      onValue(TweetDataref, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          settweetsCardData((prev) => [...prev, data]);
        }
      });
    });
  }

  useEffect(() => {
    setFollowingTweetsCache(tweetsCardData);
    console.log(tweetsCardData);
    setReadyForScroll(true);
  }, [tweetsCardData]);

  return (
    <>
      {noTweets && (
        <p className="p-3">
          No tweets available for now, follow somebody and you will see their
          tweets here
        </p>
      )}
      {tweetsCardData !== undefined &&
        tweetsCardData.reverse().map((item, index) => {
          return (
            <React.Fragment key={item.tweetId}>
              <Link
                key={item.tweetId}
                to={"/Home/" + item.username + "/" + item.tweetId}
                className="main-tweet-card w-full relative cursor-pointer flex"
              >
                {item.RetweetedBy ? (
                  <div className="absolute flex gap-2 left-6 justify-center items-center top-0 text-sm retweetedText">
                    <div>
                      <FaRetweet />{" "}
                    </div>
                    <div>{item.RetweetedBy} Retweeted</div>
                  </div>
                ) : (
                  ""
                )}
                <div
                  className={
                    item.RetweetedBy
                      ? "mt-3 ml-4 main-tweet-card-first-half"
                      : "mt-2 ml-4 main-tweet-card-first-half"
                  }
                >
                  <img
                    src={item.profilePic}
                    alt="user profile image"
                    className="rounded-full h-10 w-10 mr-5 cursor-pointer main-card-profile-pic"
                  />
                </div>

                <div className="w-full main-tweet-card-second-half">
                  <div className="flex justify-between w-full pr-2 mt-3">
                    <div className="flex items-center overflow-x-scroll tweetcardprofilenameanddisplayholder">
                      <p className="main-tweet-card-display-name flex items-center gap-1 font-semibold mr-2 whitespace-nowrap flex-wrap ">
                        {item.displayName}{" "}
                        {item.badgedUser && (
                          <span className="bluetext">
                            <BsFillPatchCheckFill />
                          </span>
                        )}
                      </p>
                      <p className="text-sm main-tweet-card-username whitespace-nowrap">
                        <span>{item.username} </span> . {item.tweetDate}
                      </p>
                    </div>
                    <div className="">
                      <div className="homepage-center-current-trend-more font-bold rounded-full cursor-pointer">
                        <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                      </div>
                    </div>
                  </div>
                  <div className="main-tweet-card-content overflow-x-hidden">
                    {item.tweetText && <TextComponent text={item.tweetText} />}
                    {
                      <div className="main-tweet-image-border">
                        <img
                          src={item.tweetImageLink}
                          alt=""
                          className="main-tweet-image"
                        />
                      </div>
                    }
                    <div className="main-tweet-card-user-actions flex w-full pt-2 gap-6 overflow-x-scroll">
                      <button
                        className="flex gap-3 items-center main-tweet-comment-icon"
                        aria-label="Comments"
                      >
                        <div className="p p-1.5 rounded-full main-comment-icon-surround">
                          <FaRegCommentDots />
                        </div>
                        <span>{Object.keys(item.comments).length - 1}</span>
                      </button>
                      <button
                        className="flex gap-3 items-center main-tweet-retweet-icon"
                        aria-label="Retweets"
                      >
                        <div className="p p-1.5 rounded-full main-retweet-icon-surround">
                          <FaRetweet />
                        </div>
                        <span>
                          {item.retweets.length === 1
                            ? "0"
                            : item.retweets.length}
                        </span>
                      </button>
                      <button
                        className="flex gap-3 items-center main-tweet-like-icon"
                        aria-label="Likes"
                      >
                        <div className="p p-1.5 rounded-full main-like-icon-surround">
                          <AiOutlineHeart />
                        </div>
                        <span>
                          {item.likes.length === 1 ? "0" : item.likes.length}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </React.Fragment>
          );
        })}
      {loadingTweets && <Loader />}
    </>
  );
};

export default FollowingTweets;
