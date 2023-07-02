import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { useSelector, useDispatch } from "react-redux";
import { currentUserState, mobileNavLeftState } from "../store";

library.add(fas);
library.add(fab);
library.add(far);

function MessagesPage() {
  const currentUser = useSelector((state) => state.currUsr.value);
  console.log(currentUser)
  const dispatch = useDispatch();
    const mobNavleft = useSelector((state) => state.mobNavleft.value);
  return (
    <>
      <section className="homepage-center h-screen relative overflow-hidden">
        <header className="flex flex-col px-5 pt-5 notificationheaderBorder">
          <div className="flex justify-between items-center">
            <div
              className="notificationUserImage flex items-center"
              onClick={() => {
                dispatch(mobileNavLeftState(true));
                document.body.classList.add("overlay-open");
                console.log(mobNavleft);
              }}
            >
              <img
                src={currentUser? currentUser.profile_picture : ""}
                alt="user profile image"
                className=" rounded-full w-8 h-8 max-h-8"
              />
            </div>
            <div className="flex justify-between w-full items-center">
              <p className="t text-xl font-bold">Messages</p>
              <Link
                to="/Home/Settings/"
                className="p-1 rounded-full notificationSettingsButton flex justify-center items-center cursor-pointer"
              >
                <SettingsTwoToneIcon fontSize="small" />
              </Link>
            </div>
          </div>
          <div className="w-14 pb-3 flex justify-center items-center mt-8 notificationHeaderAll">
            <p className="fo font-semibold text-sm">All</p>
          </div>
        </header>
        <section>
          <div className="px-10 pt-5">
            <p className=" text-3xl font-black pb-2">Welcome to your inbox!</p>
            <p className="messageTextDropaline mb-3">
              Drop a line, share Tweets and more with private conversations
              between you and others on Tweeter.{" "}
            </p>
            <button className=" bg-orange-400 px-10 py-4 rounded-full messageWriteMessageButton font-semibold">Write your message</button>
          </div>
        </section>
      </section>
    </>
  );
}

export default MessagesPage;
