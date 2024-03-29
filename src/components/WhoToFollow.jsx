import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ref, set, onValue } from "firebase/database";
import { realTimeDatabase } from "../config/firebase";
import Loader from "../pages/auth/components/Loader";
import AdministrativeLinks from "./AdministrativeLinks";
import { useRef } from "react";

const WhoToFollow = () => {
  const currentUser = useSelector((state) => state.currUsr.value);
  const [userlist, setuserlist] = useState({});
  const [refneduserlist, setrefneduserlist] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loadedUsers, setloadedUsers] = useState(false);
  const [runPermit, setrunPermit] = useState(true);
  const [currUsrFollowing, setCurrUsrFollowing] = useState([]);
  const [othrUsrFollowing, setothrUsrFollowing] = useState([]);

  let currentDate = new Date();
  const selectedUsersRef = useRef(selectedUsers);

  useEffect(() => {
    const userDirRef = ref(realTimeDatabase, "users/");
    onValue(userDirRef, (snapshot) => {
      let data = snapshot.val();
      setuserlist(data);
      setothrUsrFollowing(data);
    });

    const CurrUsrfollowRef = ref(
      realTimeDatabase,
      `users/${currentUser.userId}/followingNumber`
    );
    onValue(CurrUsrfollowRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let dataClone = [...data];
        setCurrUsrFollowing(dataClone);

        // Update UI based on the new data
        setSelectedUsers((prevUsers) =>
          prevUsers.map((user) => {
            const isFollowing = dataClone.includes(user.userId);
            return {
              ...user,
              isFollowing,
            };
          })
        );
      }
    });
  }, []);

  useEffect(() => {
    for (const key in userlist) {
      setrefneduserlist((prev) => [...prev, userlist[key]]);
    }
  }, [userlist]);

  useEffect(() => {
    if (runPermit) {
      const randomizedList = [...refneduserlist].sort(
        () => 0.5 - Math.random()
      );
      const uniqueUsers = [...new Set(randomizedList)].slice(0, 3);

      uniqueUsers.forEach((user) => {
        user.userId === currentUser.userId
          ? uniqueUsers.splice(uniqueUsers.indexOf(user), 1)
          : uniqueUsers;
      });

      setSelectedUsers(
        uniqueUsers.map((user) => {
          const isFollowing = currUsrFollowing.includes(user.userId);
          return {
            ...user,
            isFollowing,
          };
        })
      );
      uniqueUsers.length === 0 ? setrunPermit(true) : setrunPermit(false);
    }
  }, [refneduserlist]);

  useEffect(() => {
    if (selectedUsers.length > 1) {
      setloadedUsers(true);
    }
  }, [selectedUsers]);

  function handleUnFollowWhoCard(userId) {
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
        const CurrUsrfollowRef = ref(
          realTimeDatabase,
          `users/${currentUser.userId}/followingNumber`
        );

        onValue(CurrUsrfollowRef, (snapshot) => {
          const data = snapshot.val();
          let dataClone = [...data];
          setCurrUsrFollowing(dataClone);

          setSelectedUsers((prev) =>
            prev.map((user) => {
              if (user.userId === userId) {
                return {
                  ...user,
                  isFollowing: false,
                };
              }
              return user;
            })
          );
        });

        const OtherUsrUnfollowRef = ref(
          realTimeDatabase,
          `users/${userId}/followersNumber`
        );

        if (othrUsrFollowing) {
          let otherUsrdataClone = [...othrUsrFollowing[userId].followersNumber];

          otherUsrdataClone.length === 1
            ? (otherUsrdataClone = [0])
            : otherUsrdataClone.splice(otherUsrdataClone.indexOf(userId), 1);

          set(OtherUsrUnfollowRef, otherUsrdataClone)
            .then(() => {
              const userDirRef = ref(realTimeDatabase, "users/");
              onValue(userDirRef, (snapshot) => {
                let data = snapshot.val();
                setothrUsrFollowing(data);
              });
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {});
  }

  function handleFollowWhoCard(userId) {
    const CurrUsrfollowRef = ref(
      realTimeDatabase,
      `users/${currentUser.userId}/followingNumber`
    );
    let currUsrdataClone = currUsrFollowing;
    currUsrdataClone.length === 1 && currUsrdataClone[0] === 0
      ? (currUsrdataClone = [userId])
      : currUsrdataClone.push(userId);

    set(CurrUsrfollowRef, currUsrdataClone)
      .then(() => {
        const CurrUsrfollowRef = ref(
          realTimeDatabase,
          `users/${currentUser.userId}/followingNumber`
        );
        onValue(CurrUsrfollowRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            let dataClone = [...data];
            setCurrUsrFollowing(dataClone);

            setSelectedUsers((prev) =>
              prev.map((user) => {
                if (user.userId === userId) {
                  return {
                    ...user,
                    isFollowing: true,
                  };
                }
                return user;
              })
            );
          }
        });

        const OtherUsrfollowRef = ref(
          realTimeDatabase,
          `users/${userId}/followersNumber`
        );

        if (othrUsrFollowing) {
          let otherUsrdataClone = [...othrUsrFollowing[userId].followersNumber];

          otherUsrdataClone.length === 1 && otherUsrdataClone[0] === 0
            ? (otherUsrdataClone = [currentUser.userId])
            : otherUsrdataClone.push(currentUser.userId);

          set(OtherUsrfollowRef, otherUsrdataClone)
            .then(() => {
              const userDirRef = ref(realTimeDatabase, "users/");
              onValue(userDirRef, (snapshot) => {
                let data = snapshot.val();
                setothrUsrFollowing(data);
              });
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {});
  }

  return (
    <>
      <div
        style={{ backgroundColor: "rgb(22,24,28)" }}
        className="homepage-right-box-who-to-follow mt-3 px-5 py-3  rounded-2xl flex flex-col "
      >
        <p className="font-black text-lg pb-2 text-zinc-200">Who to follow</p>

        <section className="flex flex-col gap-3">
          {loadedUsers &&
            selectedUsers.map((user, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <div className="flex gap-3">
                    <div className="">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user.profile_picture}
                        alt=""
                      />
                    </div>
                    <div className="">
                      <div className=" font-semibold">{user.displayName}</div>
                      <div className="homelabelcolor text-sm">
                        {user.username}
                      </div>
                    </div>
                  </div>
                  <div>
                    {user.isFollowing ? (
                      <span>
                        <button
                          onClick={() => {
                            handleUnFollowWhoCard(user.userId);
                          }}
                          style={{
                            backgroundColor: "var(--homeLabelColor)",
                          }}
                          className="bg-white text-gray-900 text-sm px-4 w-28 py-1 rounded-full font-semibold"
                        >
                          Following
                        </button>
                      </span>
                    ) : (
                      <span>
                        <button
                          onClick={() => {
                            handleFollowWhoCard(user.userId);
                          }}
                          className="bg-white text-gray-900 text-sm px-4 w-28 py-1 rounded-full font-semibold"
                        >
                          Follow
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          {!loadedUsers && <Loader />}
        </section>
      </div>
      <div className="mb-32 w-80">
        <AdministrativeLinks currentDate={currentDate} />
      </div>
    </>
  );
};

export default WhoToFollow;
