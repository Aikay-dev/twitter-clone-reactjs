import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import HomeRight from "./HomeRight";
import TweetStream from "./dataStream/TweetStream";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { mobileNavLeftState } from "../../store";

library.add(fas);
library.add(fab);
library.add(far);

const Home = () => {
  const dispatch = useDispatch();
  const mobNavleft = useSelector(state => state.mobNavleft.value);

  return (
    <>
      <section className="homepage-center h-screen relative overflow-hidden">
        <header className="pt-4">
          <div className="pl-3 w-full mobileheader flex gap-1 sm:hidden">
            <div
              className="home-nav-profile-image w-12 flex justify-center items-center"
              onClick={() => {
                dispatch(mobileNavLeftState(true));
                document.body.classList.add("overlay-open");
                console.log(mobNavleft)
              }}
            >
              <img
                src="https://picsum.photos/200/300"
                alt="user profile image"
                className="rounded-full w-10 h-10 max-h-10"
              />
            </div>
            <Link
              to="/"
              className=" home-main-bird-header w-full text-white text-2xl  pr-16 flex items-center justify-center"
            >
              <FontAwesomeIcon icon="fab fa-twitter" />
            </Link>
          </div>
          <p className="text text-lg font-semibold pl-4 mb-3 home-main-header-text-home">
            Home
          </p>
          <div className="flex w-full h-14 homepage-center-top-nav">
            <button className="w-1/2 homepage-center-top-nav-foryou flex justify-center items-center">
              <div
                style={{ borderBottom: "2px solid rgb(29, 155, 240)" }}
                className="h-full flex justify-center items-center"
              >
                For you
              </div>
            </button>
            <button className="w-1/2 homepage-center-top-nav-following flex justify-center items-center">
              <div
                style={{ borderBottom: "2px solid rgb(29, 155, 240)" }}
                className="h-full flex justify-center items-center"
              >
                Following
              </div>
            </button>
          </div>
        </header>
        <div className="h-full w-full tweet-scroll-section overflow-y-scroll overflow-x-hidden">
          <section className="py-3 px-5 home-main-tweet-section">
            <div className="flex">
              <div>
                <img
                  src="https://picsum.photos/200/300"
                  alt="user profile image"
                  className="rounded-full h-14 w-14 mr-3 cursor-pointer"
                />
              </div>
              <input
                type="text"
                placeholder="What's happening?"
                className="w-full text-xl pl-3 outline-none bg-black"
              />
            </div>
            <div className="flex mt-6 justify-between items-center home-main-tweet-section-bottom">
              <div className="flex pl-16 gap-3">
                <div>
                  <FontAwesomeIcon icon="fa-regular fa-image" />
                </div>
                <div>
                  <FontAwesomeIcon icon="fa-regular fa-calendar-days" />
                </div>
              </div>
              <button className="home-main-tweet-section-button text-white px-4 rounded-full py-1 font-semibold">
                Tweet
              </button>
            </div>
          </section>
          <section className="main-tweet-flow-section">
            <TweetStream />
          </section>
        </div>
      </section>

      <HomeRight />
    </>
  );
};

export default Home;
