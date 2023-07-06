import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { realTimeDatabase } from "../config/firebase";
import Loader from "../pages/auth/components/Loader";

const WhoToFollow = () => {
  const currentUser = useSelector((state) => state.currUsr.value);
  console.log(currentUser);
  const [userlist, setuserlist] = useState({});
  const [refneduserlist, setrefneduserlist] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loadedUsers, setloadedUsers] = useState(false);
  const [runPermit, setrunPermit] = useState(true);
  const [currUsrFollowing, setCurrUsrFollowing] = useState([]);
  const [othrUsrFollowing, setothrUsrFollowing] = useState([]);

  useEffect(() => {
    const userDirRef = ref(realTimeDatabase, "users/");
    onValue(userDirRef, (snapshot) => {
      let data = snapshot.val();
      console.log(data);
      setuserlist(data);
    });
  }, []);

  useEffect(() => {
    console.log(userlist);
    for (const key in userlist) {
      console.log(userlist[key]);
      setrefneduserlist((prev) => [...prev, userlist[key]]);
      console.log(refneduserlist);
    }
  }, [userlist]);

  useEffect(() => {
    if (runPermit) {
      console.log("has run");
      // Randomize the array
      const randomizedList = [...refneduserlist].sort(
        () => 0.5 - Math.random()
      );

      // Select only three dissimilar items
      const uniqueUsers = [...new Set(randomizedList)].slice(0, 3);

      uniqueUsers.forEach((user) => {
        user.userId === currentUser.userId
          ? uniqueUsers.splice(uniqueUsers.indexOf(user), 1)
          : uniqueUsers;
      });
      console.log(uniqueUsers);
      setSelectedUsers(uniqueUsers);
      uniqueUsers.length === 0 ? setrunPermit(true) : setrunPermit(false);
    }
  }, [refneduserlist]);

  useEffect(() => {
    console.log("selected users:", selectedUsers.length);
    if (selectedUsers.length > 1) {
      setloadedUsers(true);
    }
  }, [selectedUsers]);

  useEffect(() => {
    const CurrUsrfollowRef = ref(
      realTimeDatabase,
      `users/${currentUser.userId}/followingNumber`
    );
    onValue(CurrUsrfollowRef, (snapshot) => {
      const data = snapshot.val();
      let dataClone = [...data];
      console.log(dataClone);
      setCurrUsrFollowing(dataClone);
    });

    const OtherUsrUnfollowRef = ref(realTimeDatabase, `users/`);
    onValue(OtherUsrUnfollowRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setothrUsrFollowing(data);
    });
  }, []);

  function handleUnFollow(userId) {
    console.log(userId);
    const CurrUsrUnfollowRef = ref(
      realTimeDatabase,
      `users/${currentUser.userId}/followingNumber`
    );

    let currentUserdataClone = currUsrFollowing;

    currentUserdataClone.length === 1
      ? (currentUserdataClone = [0])
      : currentUserdataClone.splice(currentUserdataClone.indexOf(userId), 1);
    set(CurrUsrUnfollowRef, currentUserdataClone)
      .then(() => {
        console.log("unfollowed successfully");
      })
      .catch((error) => {
        console.log("error: " + error);
      });

    const OtherUsrUnfollowRef = ref(
      realTimeDatabase,
      `users/${userId}/followersNumber`
    );

    let otherUsrdataClone = [...othrUsrFollowing[userId].followersNumber];

    otherUsrdataClone.length === 1
      ? (otherUsrdataClone = [0])
      : dataClone.splice(otherUsrdataClone.indexOf(userId), 1);
    set(OtherUsrUnfollowRef, otherUsrdataClone)
      .then(() => {
        console.log("unfollowed successfully");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }

  function handleFollow(userId) {
    console.log(userId);
    const CurrUsrfollowRef = ref(
      realTimeDatabase,
      `users/${currentUser.userId}/followingNumber`
    );
    let currUsrdataClone = currUsrFollowing;
    currUsrdataClone.length === 1
      ? (currUsrdataClone = [userId])
      : currUsrdataClone.push(userId);
    set(CurrUsrfollowRef, currUsrdataClone)
      .then(() => {
        console.log("followed successfully");
      })
      .catch((error) => {
        console.log("error: " + error);
      });

    const OtherUsrfollowRef = ref(
      realTimeDatabase,
      `users/${userId}/followersNumber`
    );

    let otherUsrdataClone = [...othrUsrFollowing[userId].followersNumber];

    otherUsrdataClone.length === 1
      ? (otherUsrdataClone = [currentUser.userId])
      : otherUsrdataClone.push(currentUser.userId);
    set(OtherUsrfollowRef, otherUsrdataClone)
      .then(() => {
        console.log("followed successfully");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }
  return (
    <div
      style={{ backgroundColor: "rgb(22,24,28)" }}
      className="homepage-right-box mt-3 px-5 py-3  rounded-2xl flex flex-col "
    >
      <p className="font-black text-lg pb-2 text-zinc-200">Who to follow</p>

      <section className="flex flex-col gap-3">
        {loadedUsers &&
          selectedUsers.map((users, index) => {
            return (
              <div key={index} className="flex justify-between">
                <div className="flex gap-3">
                  <div className="">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={users.profile_picture}
                      alt=""
                    />
                  </div>
                  <div className="">
                    <div className=" font-semibold">{users.displayName}</div>
                    <div className="homelabelcolor">{users.username}</div>
                  </div>
                </div>
                <div>
                  {users.followersNumber.map((user) => {
                    if (user === currentUser.userId) {
                      return (
                        <span key={user}>
                          <button
                            onClick={() => {
                              handleUnFollow(users.userId);
                            }}
                            style={{ backgroundColor: "var(--homeLabelColor)" }}
                            className="bg-white text-gray-900 text-sm px-4 w-28 py-1 rounded-full font-semibold"
                          >
                            Following
                          </button>
                        </span>
                      );
                    } else {
                      return (
                        <span key={user}>
                          <button
                            onClick={() => {
                              handleFollow(users.userId);
                            }}
                            className="bg-white text-gray-900 text-sm px-4 w-28 py-1 rounded-full font-semibold"
                          >
                            Follow
                          </button>
                        </span>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        {!loadedUsers && <Loader />}
      </section>
    </div>
  );
};

export default WhoToFollow;
