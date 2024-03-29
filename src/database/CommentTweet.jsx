import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegCommentDots, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { realTimeDatabase } from "../config/firebase";
import { ref, onValue } from "firebase/database";
import TextComponent from "../components/TextComponent";
import Loader from "../pages/auth/components/Loader";
import { BsFillPatchCheckFill } from "react-icons/bs";

const CommentTweet = ({
  fulltweetData,
  setcommentTweet,
  setLoadedFullTweet,
}) => {
  const currentUser = useSelector((state) => state.currUsr.value);
  const [tweetsCardData, settweetsCardData] = useState([]);
  const [commentKeys, setcommentKeys] = useState({});
  const [commentLoaded, setcommentLoaded] = useState(false);
  const [loadedInitially, setloadedInitially] = useState(false);

  useEffect(() => {
    if (fulltweetData !== null && !loadedInitially) {
      const tweetdata = fulltweetData.comments;

      const values = Object.values(tweetdata);

      setcommentKeys(values);
      setloadedInitially(true);
    }
  }, [fulltweetData]);

  useEffect(() => {
    for (let i = 0; i < commentKeys.length; i++) {
      rtdbUsrTwtsRqsts(commentKeys[i]);
    }
  }, [commentKeys]);

  function rtdbUsrTwtsRqsts(id) {
    const TweetDataref = ref(realTimeDatabase, `commentTweetPool/${id}`);
    onValue(TweetDataref, (snapshot) => {
      const data = snapshot.val();

      settweetsCardData((prevData) => {
        const newData = [...prevData];
        newData.unshift(data);
        return newData;
      });

      setcommentLoaded(true);
    });
  }

  return (
    <>
      {!commentLoaded && <Loader />}
      {commentLoaded &&
        tweetsCardData.length > 0 &&
        tweetsCardData.map((item, index) => {
          if (!item) {
            return (
              <React.Fragment key={index}>
                {tweetsCardData[0] === null && tweetsCardData.length < 2 && (
                  <p className="p-3">
                    No comments available for now, make a comment and it will
                    showup here
                  </p>
                )}
              </React.Fragment>
            ); // Skip rendering if item is null or undefined
          }
          return (
            <React.Fragment key={item.tweetId}>
              <Link
                onClick={() => {
                  setcommentTweet(false);
                  setLoadedFullTweet(false);
                  setcommentLoaded(false);
                }}
                key={item.tweetId}
                to={"/Home/" + item.username + "/" + item.tweetId}
                className="main-tweet-card w-full relative cursor-pointer flex"
              >
                <div className="mt-3 ml-4 main-tweet-card-first-half">
                  <img
                    src={item.profilePic}
                    alt="user profile image"
                    className="rounded-full h-10 w-10 mr-5 cursor-pointer main-card-profile-pic"
                  />
                </div>

                <div className=" w-full main-tweet-card-second-half">
                  <div className="flex justify-between w-full pr-2 mt-3">
                    <div className="flex items-center overflow-x-scroll tweetcardprofilenameanddisplayholder">
                      <p className="main-tweet-card-display-name flex flex-nowrap items-center gap-1 font-semibold mr-2 whitespace-nowrap">
                        <span>{item.displayName}</span>{" "}
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
                    {item.tweetImageLink.length > 0 && (
                      <div className="main-tweet-image-border">
                        <img
                          src={item.tweetImageLink}
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
                          {item.likes.length === 1
                            ? "0"
                            : item.likes.length - 1}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </React.Fragment>
          );
        })}
    </>
  );
};

export default CommentTweet;
