import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import HomeRight from "./Home/HomeRight";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { mobileNavLeftState } from "../store";
import { realTimeDatabase } from "../config/firebase";
import { ref, update } from "firebase/database";
import NotificationStream from "../database/NotificationStream";

library.add(fas);
library.add(fab);
library.add(far);

function NotificationPage() {
  const currentUser = useSelector((state) => state.currUsr.value);
  console.log(currentUser)
    const dispatch = useDispatch();
    const mobNavleft = useSelector((state) => state.mobNavleft.value);
  

    useEffect(() => {

        const seenUpdate = {...currentUser, seenNotification: currentUser.notificationData.length}
        console.log(seenUpdate)
        updateSeenNode("users/"+ currentUser.userId, seenUpdate)
      
    }, [])

    const updateSeenNode = (path, newData) => {
      const dbRef = ref(realTimeDatabase, path);
      update(dbRef, newData)
        .then(() => {
          console.log("Data updated successfully");
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          settweetingLoader(false);
        });
    };
    

  
    return (
    <>
      <section className="homepage-center h-screen relative overflow-hidden">
        <header className="flex flex-col px-5 pt-5 notificationheaderBorder profilePageHeader bg-black w-full">
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
                src="https://picsum.photos/200/300"
                alt="user profile image"
                className=" rounded-full w-8 h-8 max-h-8"
              />
            </div>
            <div className="flex justify-between w-full items-center">
              <p className="t text-xl font-bold">Notifications</p>
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
        <section className="pt-32 overflow-y-scroll  h-screen notificationmainsection">
          <NotificationStream streamData = {currentUser.notificationData}/>
          <div className="notificationcard flex justify-center items-center py-3 px-6 gap-4 cursor-pointer">
            <div className="text text-3xl">
              <FontAwesomeIcon icon="fab fa-twitter" />
            </div>
            <div>
              There was a login to your account @general_ik from a new device on
              Jun 11, 2023.
            </div>
          </div>
          <div className="notificationcard flex items-center py-3 px-6 gap-4 cursor-pointer">
            <div className="text text-2xl text-blue-500">
              <FontAwesomeIcon icon="fa-solid fa-user" />
            </div>
            <div>
              <img
                src="https://picsum.photos/200/300"
                alt="user profile image"
                className="rounded-full h-8 min-w-8 w-8 mb-2 max-w-14 mr-5 cursor-pointer"
              />
              <p>Kandis Beninato followed you</p>
            </div>
          </div>
          <div className="notificationcard flex items-center py-3 px-6 gap-4 cursor-pointer">
            <div className="text text-2xl text-pink-600">
              <FontAwesomeIcon icon="fa-solid fa-heart" />
            </div>
            <div>
              <img
                src="https://picsum.photos/200/300"
                alt="user profile image"
                className="rounded-full h-8 min-w-8 w-8 mb-2 max-w-14 mr-5 cursor-pointer"
              />
              <p>Andrew Bello liked your post</p>
            </div>
          </div>
          <div className=" h-60"></div>
        </section>
      </section>

      <HomeRight />
    </>
  );
}

export default NotificationPage;
