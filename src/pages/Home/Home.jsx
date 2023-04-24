import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import SearchBar from "../../components/SearchBar";
import Trendstream from "../../components/TrendStream";
import HomeRight from "./HomeRight";


library.add(fas);
library.add(fab);
library.add(far);

const Home = () => {
  return (
    <>
      <section className="homepage-center h-screen relative overflow-hidden">
        <header className="pt-4">
          <p className="text text-lg font-semibold pl-4 mb-3">Home</p>
          <div className="flex w-full h-14 homepage-center-top-nav">
            <button className="w-1/2 homepage-center-top-nav-foryou">
              For you
            </button>
            <button className="w-1/2 homepage-center-top-nav-following">
              Following
            </button>
          </div>
        </header>
        <div className="h-full overflow-y-scroll">
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
          <section className="main-tweet-flow-section overflow-y-scroll">
            <div className="main-tweet-card w-full relative cursor-pointer">
              <div className = "m ml-5 mt-3 flex">
                <div>
                <img
                  src="https://picsum.photos/200/300"
                  alt="user profile image"
                  className="rounded-full h-14 w-14 mr-5 cursor-pointer"
                />
                </div>
                <div className = "flex justify-between w-full pr-2">
                  <div className="flex">
                    <p className="main-tweet-card-display-name font-semibold mr-2 ">Elon Musk</p>
                    <p className="text-sm main-tweet-card-username">@elonmusk . Apr 22</p>
                  </div>
                  <div>
                    <div className="homepage-center-current-trend-more mb-9 font-bold rounded-full cursor-pointer">
                      <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-tweet-card-holder absolute">
                <img src="https://pbs.twimg.com/media/FuWY7lpX0AAu-LH?format=jpg&name=small" alt="" className="main-tweet-image"/>
              </div>
              <div>
                <span>comment</span>
              </div>
            </div>
          </section>
        </div>
      </section>
      <HomeRight />
    </>
  );
};

export default Home;
