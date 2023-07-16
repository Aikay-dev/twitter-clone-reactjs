import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegCommentDots, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { realTimeDatabase } from "../config/firebase";
import { ref, onValue, off } from "firebase/database";
import TextComponent from "../components/TextComponent";
import { BsFillPatchCheckFill } from "react-icons/bs";

const BookmarkStream = () => {
  const currentUser = useSelector((state) => state.currUsr.value);
  const [tweetsCardData, settweetsCardData] = useState([]);
  console.log(currentUser);

  useEffect(() => {
    settweetsCardData([]);
    const tweetdata = currentUser.bookmarkData;
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
    tweetsCardData.reverse();
    console.log(tweetsCardData.length);
  }, [tweetsCardData]);

  return (
    <>
      {tweetsCardData.length > 0 &&
        tweetsCardData.reverse().map((item, index) => {
          if (!item) {
            return (
              <React.Fragment key={index}>
                {tweetsCardData[0] === null && tweetsCardData.length < 2 && (
                  <p className="p-3">
                    No Bookmarks available for now, bookmark a tweet and it will
                    showup here
                  </p>
                )}
              </React.Fragment>
            ); // Skip rendering if item is null or undefined
          }
          return (
            <React.Fragment key={item.tweetId}>
              <Link
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

                <div className="w-full main-tweet-card-second-half">
                  <div className="flex justify-between w-full pr-2 mt-3">
                    <div className="flex items-center overflow-x-scroll tweetcardprofilenameanddisplayholder">
                      <p className=" flex items-center gap-1 main-tweet-card-display-name font-semibold mr-2 whitespace-nowrap flex-wrap ">
                        {item.displayName}
                        {item.badgedUser && (
                          <span className="bluetext">
                            <BsFillPatchCheckFill />
                          </span>
                        )}
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
    </>
  );
};

export default BookmarkStream;
