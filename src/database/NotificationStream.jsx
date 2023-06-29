import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas);
library.add(fab);
library.add(far);

const NotificationStream = ({ streamData }) => {
  console.log(streamData);
  return streamData.map((notification) => {
    return (
      <>
        <div className="notificationcard flex items-center py-3 px-6 gap-4 cursor-pointer">
          <div>
            {notification.message === "Followed you" && (
              <div className="text text-2xl text-blue-500">
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </div>
            )}
            {notification.message ===
              "There was a Login to Your Account Recently" && (
              <div className="text text-3xl">
                <FontAwesomeIcon icon="fab fa-twitter" />
              </div>
            )}
            {notification.message === "Liked your post" && (
              <div className="text text-2xl text-pink-600">
                <FontAwesomeIcon icon="fa-solid fa-heart" />
              </div>
            )}
          </div>
          <div>
            {notification.profilePicture && (
              <img
                src={notification.profilePicture}
                alt="user profile image"
                className="rounded-full h-8 min-w-8 w-8 mb-2 max-w-14 mr-5 cursor-pointer"
              />
            )}
            <p>
              {notification.displayName} <span>{notification.message}</span>
            </p>
          </div>
        </div>
      </>
    );
  });
};

export default NotificationStream;
