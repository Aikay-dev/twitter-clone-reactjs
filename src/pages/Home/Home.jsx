import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import HomeRight from "./HomeRight";
import TweetStream from "./dataStream/TweetStream";
import { Link } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { TiSocialTwitterCircular } from "react-icons/ti";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdMailOutline,
  MdOutlineVerified,
} from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { BiHelpCircle, BiSearch } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { RiHome7Fill } from "react-icons/ri";
/* import { HiOutlineBell } from "react-icons/hi"; */

library.add(fas);
library.add(fab);
library.add(far);

const Home = () => {
  const [setNdpriv, setSetNdpriv] = useState(false);
  const [showNav, setShowNav] = useState(false)

  return (
    <>
      <section className="homepage-center h-screen relative overflow-hidden">
        <header className="pt-4">
          <div className="pl-3 w-full mobileheader flex gap-1 sm:hidden">
            <div className="home-nav-profile-image w-12 flex justify-center items-center" onClick={() =>{
              setShowNav(true)
            }}>
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
      {showNav &&
        <>
          <section className="absolute z-10 h-screen home-navbar-mobile bg-black">
            <nav className="">
              <div className="flex px-3 justify-between items-center pt-3 pb-5">
                <p className="t text-lg font-semibold">Account info</p>
                <div onClick={() => {
                  setShowNav(false)
                }}>
                  <FontAwesomeIcon icon="fas fa-xmark " />
                </div>
              </div>
              <div className="home-nav-profile-image w-12 flex mx-3 justify-center items-center">
                <img
                  src="https://picsum.photos/200/300"
                  alt="user profile image"
                  className="rounded-full w-10 h-10 max-h-10"
                />
              </div>
              <p className="mx-3 font-semibold text-lg mt-2">Hail Hydra</p>
              <p className="mx-3 home-nav-username mb-3">@general ik</p>
              <div className="flex items-center gap-4 ml-3">
                <p>
                  <span className="font-semibold">167</span>{" "}
                  <span className="home-nav-username">Following</span>
                </p>
                <p>
                  <span className="font-semibold">14</span>{" "}
                  <span className="home-nav-username">Followers</span>
                </p>
              </div>
              <div className="flex flex-col gap-6 ml-3 mt-5">
                <Link className="flex gap-6 text-2xl">
                  <div>
                    <FontAwesomeIcon icon="fa-regular fa-user" />
                  </div>
                  <p className="">Profile</p>
                </Link>
                <Link className="flex gap-6 text-2xl">
                  <div>
                    <FontAwesomeIcon icon="fa-brands fa-square-twitter" />
                  </div>
                  <p className="">Tweeter Blue</p>
                </Link>
                <Link className="flex gap-6 text-2xl">
                  <div>
                    <FontAwesomeIcon icon="fa-regular fa-user" />
                  </div>
                  <p className="">Topics</p>
                </Link>
                <Link className="flex gap-6 text-2xl">
                  <div>
                    <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                  </div>
                  <p className="">Bookmarks</p>
                </Link>
                <Link className="flex gap-6 text-2xl">
                  <div>
                    <CgNotes />
                  </div>
                  <p className="">Lists</p>
                </Link>
                <Link className="flex gap-6 text-2xl">
                  <div>
                    <TiSocialTwitterCircular />
                  </div>
                  <p className="">Tweeter Circle</p>
                </Link>
                <Link className="flex gap-6 text-2xl">
                  <div>
                    <MdOutlineVerified />
                  </div>
                  <p className="">Verified Organizations</p>
                </Link>
              </div>
              <div className="home-mobile-navbar-bottom-section mx-3 mt-4 pt-3">
                <div
                  className="flex justify-between items-center py-3 px-1"
                  onClick={() => {
                    setNdpriv ? setSetNdpriv(false) : setSetNdpriv(true);
                  }}
                >
                  <p>Settings and Support</p>
                  {setNdpriv && <MdKeyboardArrowUp />}
                  {!setNdpriv && <MdKeyboardArrowDown />}
                </div>
                {setNdpriv && (
                  <nav>
                    <ul className="flex flex-col gap-3 mt-1">
                      <li className="flex gap-6 text-xl items-center">
                        <span>
                          <AiOutlineSetting />
                        </span>{" "}
                        <p>Settings and privacy</p>
                      </li>
                      <li className="flex gap-6 text-xl items-center">
                        <span>
                          <BiHelpCircle />
                        </span>{" "}
                        <p>Help Center</p>
                      </li>
                      <li className="flex gap-6 text-xl items-center">
                        <span>
                          <FiLogOut />
                        </span>{" "}
                        <p>Log out</p>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </nav>
          </section>
          <div
            className="absolute h-screen w-screen"
            style={{ backgroundColor: "rgba(77, 91, 102, 0.5)" }}
          ></div>
        </>
      }
      <nav className="w-screen absolute mobile-bottom-nav justify-around bottom-0 py-3 text-3xl items-center">
        <button><RiHome7Fill/></button>
        <button><BiSearch/></button>
        <button><FontAwesomeIcon icon="fa-regular fa-bell" /></button>
        <button><MdMailOutline/></button>
      </nav>
      <HomeRight />
    </>
  );
};

export default Home;
