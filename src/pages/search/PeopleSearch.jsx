import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { onValue, ref, set } from "firebase/database";
import { realTimeDatabase } from "../../config/firebase";

const PeopleSearch = ({ searchPeople }) => {
  const currentUser = useSelector((state) => state.currUsr.value);
  const [userlist, setuserlist] = useState({});
  const [currUsrFollowing, setCurrUsrFollowing] = useState([]);
  const [othrUsrFollowing, setothrUsrFollowing] = useState([]);

  useEffect(() => {
    const userDirRef = ref(realTimeDatabase, "users/");
    onValue(userDirRef, (snapshot) => {
      let data = snapshot.val();
      let dataClone = { ...data };
      console.log(dataClone);
      setuserlist(dataClone);
      setothrUsrFollowing(dataClone);
    });

    const CurrUsrfollowRef = ref(
      realTimeDatabase,
      `users/${currentUser.userId}/followingNumber`
    );
    onValue(CurrUsrfollowRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let dataClone = [...data];
        console.log(dataClone);
        setCurrUsrFollowing(dataClone);
      }
    });
  }, []);

  const filteredCurrentUser = searchPeople.filter((person) => {
    return person.userId !== currentUser.userId;
  });
  console.log("after filter");
  console.log(filteredCurrentUser);

  function handleFollow(userId) {
    console.log(userId);
    const CurrUsrfollowRef = ref(
      realTimeDatabase,
      `users/${currentUser.userId}/followingNumber`
    );
    let currUsrdataClone = [...currUsrFollowing, userId];
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

    let otherUsrdataClone = [...othrUsrFollowing[userId].followersNumber, currentUser.userId];
    set(OtherUsrfollowRef, otherUsrdataClone)
      .then(() => {
        console.log("followed successfully");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }

  function handleUnFollow(userId) {
    console.log(userId);
    const CurrUsrUnfollowRef = ref(
      realTimeDatabase,
      `users/${currentUser.userId}/followingNumber`
    );

    let currentUserdataClone = [...currUsrFollowing];
    currentUserdataClone.splice(
      currentUserdataClone.indexOf(userId),
      1
    );
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
    otherUsrdataClone.splice(
      otherUsrdataClone.indexOf(currentUser.userId),
      1
    );
    set(OtherUsrUnfollowRef, otherUsrdataClone)
      .then(() => {
        console.log("unfollowed successfully");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }

  return (
    <>
      {filteredCurrentUser.length > 0 ? (
        filteredCurrentUser.map((person) => {
          if(person.followersNumber){
            const isCurrentUserAFollower = person.followersNumber.includes(currentUser.userId);
          
          return (
            <div className="flex w-full search-people-card" key={person.userId}>
              <div className="ml-3 my-3">
                <img
                  src={person.profile_picture}
                  alt="Profile picture"
                  className="rounded-full h-10 w-10 mr-5 cursor-pointer main-card-profile-pic"
                />
              </div>
              <div className="my-3 mr-3 w-full">
                <div className="flex justify-between">
                  <Link to={"/Home/" + person.username}>
                    <p className=" font-semibold">{person.displayName}</p>
                    <p className=" text-sm homelabelcolor pb-1">
                      {person.username}
                    </p>
                  </Link>
                  <div>
                    {
                      isCurrentUserAFollower ? (
                        <span key={person.userId}>
                          <button
                            onClick={() => {
                              handleUnFollow(person.userId);
                            }}
                            style={{
                              backgroundColor: "var(--homeLabelColor)",
                            }}
                            className="bg-white h-7 text-gray-900 text-sm px-4 w-28 py-1 rounded-full font-semibold"
                          >
                            Following
                          </button>
                        </span>
                      ) : (
                        <span key={person.userId}>
                          <button
                            onClick={() => {
                              handleFollow(person.userId);
                            }}
                            className="bg-white h-7 text-gray-900 text-sm px-4 w-28 py-1 rounded-full font-semibold"
                          >
                            Follow
                          </button>
                        </span>
                      )
                    }
                  </div>
                </div>
                <p>{person.bioData}</p>
              </div>
            </div>
          );
          }
        })
      ) : (
        <p className="p-3">No user found</p>
      )}
    </>
  );
};

export default PeopleSearch;