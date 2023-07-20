import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { BiHomeCircle, BiSearch } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MdMail, MdMailOutline } from "react-icons/md";
import { RiHome7Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const BottomNav = ({
  showNotifAlert,
  homeClicked,
  searchClicked,
  bellClicked,
  messageClicked,
  setHomeClicked,
  setsearchClicked,
  setbellClicked,
  setmessageClicked,
  settingsChangeState,
  exploreChangeState,
}) => {
  const dispatch = useDispatch();
  return (
    <nav className="w-screen bg-black fixed mobile-bottom-nav h-14 justify-around bottom-0 text-2xl items-center">
      <Link
        to="/Home"
        onClick={() => {
          dispatch(settingsChangeState({ fontWeight: 100 }));
          dispatch(exploreChangeState({ fontWeight: "Bold" }));
          setHomeClicked(true);
          setsearchClicked(false);
          setbellClicked(false);
          setmessageClicked(false);
        }}
      >
        {!homeClicked && <BiHomeCircle />}
        {homeClicked && <RiHome7Fill />}
      </Link>
      <Link
        to="/Home/Explore"
        onClick={() => {
          dispatch(settingsChangeState({ fontWeight: 100 }));
          dispatch(exploreChangeState({ fontWeight: "Bold" }));
          setHomeClicked(false);
          setsearchClicked(true);
          setbellClicked(false);
          setmessageClicked(false);
        }}
      >
        {!searchClicked && <BiSearch />}
        {searchClicked && <FaSearch />}
      </Link>
      <Link to="/Home/Notifications">
        <button
          className="relative"
          onClick={() => {
            setHomeClicked(false);
            setsearchClicked(false);
            setbellClicked(true);
            setmessageClicked(false);
          }}
        >
          {showNotifAlert && (
            <div className="bluetext text-xs absolute right-0">
              <FontAwesomeIcon icon="fa-solid fa-circle" />
            </div>
          )}
          {!bellClicked && <FontAwesomeIcon icon="fa-regular fa-bell" />}
          {bellClicked && <BsBellFill />}
        </button>
      </Link>
      <Link to="/Home/Messages">
        <button
          onClick={() => {
            setHomeClicked(false);
            setsearchClicked(false);
            setbellClicked(false);
            setmessageClicked(true);
          }}
        >
          {!messageClicked && <MdMailOutline />}
          {messageClicked && <MdMail />}
        </button>
      </Link>
    </nav>
  );
};

export default BottomNav;
