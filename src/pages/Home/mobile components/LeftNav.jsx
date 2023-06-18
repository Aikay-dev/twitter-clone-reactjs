import React from "react";
import { useDispatch } from "react-redux";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineVerified,
} from "react-icons/md";
import { signOut } from "firebase/auth";
import { AiOutlineSetting } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import SmLoader from "../../auth/components/smLoader";
import { auth } from "../../../config/firebase";

library.add(fas);
library.add(fab);
library.add(far);

const LeftNav = ({
  setLogoutspinner,
  logoutspinner,
  setNdpriv,
  mobileNavLeftState,
  setSetNdpriv,
}) => {
  const dispatch = useDispatch();

  return (
    <section
      className="absolute top-0 overflow-y-scroll z-50 h-screen home-navbar-mobile bg-black"
      style={{ color: "rgb(240, 240, 240)" }}
    >
      <nav>
        <div className="flex px-3 justify-between items-center pt-3 pb-5">
          <p className="t text-lg font-semibold">Account info</p>
          <div
            onClick={() => {
              document.body.classList.remove("overlay-open");
              dispatch(mobileNavLeftState(false));
            }}
          >
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
          <Link
            className="flex gap-6 text-xl"
            to="Profile"
            onClick={() => {
              document.body.classList.remove("overlay-open");
              dispatch(mobileNavLeftState(false));
            }}
          >
            <div>
              <FontAwesomeIcon icon="fa-regular fa-user" />
            </div>
            <p className="font-semibold">Profile</p>
          </Link>
          <Link
            className="flex gap-6 text-xl"
            to="Explore"
            onClick={() => {
              document.body.classList.remove("overlay-open");
              dispatch(mobileNavLeftState(false));
            }}
          >
            <div>
              <FontAwesomeIcon icon="fa-solid fa-hashtag" />
            </div>
            <p className="font-semibold">Explore</p>
          </Link>
          <Link
            className="flex gap-6 items-center text-xl"
            to="Notifications"
            onClick={() => {
              document.body.classList.remove("overlay-open");
              dispatch(mobileNavLeftState(false));
            }}
          >
            <div>
              <FontAwesomeIcon icon="fa-regular fa-bell" />
            </div>
            <p className="font-semibold">Notifications</p>
          </Link>
          <Link
            className="flex gap-6 items-center text-xl"
            to="Bookmarks"
            onClick={() => {
              document.body.classList.remove("overlay-open");
              dispatch(mobileNavLeftState(false));
            }}
          >
            <div>
              <FontAwesomeIcon icon="fa-regular fa-bookmark" />
            </div>
            <p className="font-semibold">Bookmarks</p>
          </Link>
          <Link
            className="flex gap-6 items-center text-xl"
            to="Messages"
            onClick={() => {
              document.body.classList.remove("overlay-open");
              dispatch(mobileNavLeftState(false));
            }}
          >
            <div>
              <FontAwesomeIcon icon="fa-regular fa-envelope" />
            </div>
            <p className="font-semibold ">Messages</p>
          </Link>
          <Link
            to="/Home/Tweeter%20Blue"
            className="flex items-center gap-6 text-xl"
            onClick={() => {
              document.body.classList.remove("overlay-open");
              dispatch(mobileNavLeftState(false));
            }}
          >
            <div>
              <MdOutlineVerified />
            </div>
            <p className="font-semibold">Tweeter Dev</p>
          </Link>
        </div>
        <div className="home-mobile-navbar-bottom-section mx-3 mt-4 mb-20 pt-3">
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
                <Link
                  to="/Home/Settings/"
                  onClick={() => {
                    dispatch(mobileNavLeftState(false));
                  }}
                  className="flex gap-6 text-xl items-center"
                >
                  <span>
                    <AiOutlineSetting />
                  </span>{" "}
                  <p>Settings and privacy</p>
                </Link>
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
                  <p
                    onClick={() => {
                      setLogoutspinner(true);
                      signOut(auth)
                        .then(() => {
                          setLogoutspinner(false);
                          window.location.reload();
                          console.log("user: signed out");
                        })
                        .catch((err) => {
                          console.log(err.message);
                        });
                    }}
                  >
                    Log out
                  </p>
                  {logoutspinner && (
                    <SmLoader/>
                  )}
                </li>
              </ul>
            </nav>
          )}
        </div>
      </nav>
    </section>
  );
};

export default LeftNav;