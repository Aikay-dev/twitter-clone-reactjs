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
  const [loadedUsers, setloadedUsers] = useState(false)
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
    // Randomize the array
    const randomizedList = [...refneduserlist].sort(() => 0.5 - Math.random());

    // Select only three dissimilar items
    const uniqueUsers = [...new Set(randomizedList)].slice(0, 3);

    setSelectedUsers(uniqueUsers);
  }, [refneduserlist]);

  useEffect(() => {
    console.log("selected users:", selectedUsers.length);
    if(selectedUsers.length === 3){
      setloadedUsers(true)
    }
  }, [selectedUsers]);

  return (
    <div
      style={{ backgroundColor: "rgb(22,24,28)" }}
      className="homepage-right-box mt-3 px-5 py-3  rounded-2xl flex flex-col "
    >
      <p className="font-black text-lg pb-2 text-zinc-200">Who to follow</p>

      <section className="flex flex-col gap-3">
        {loadedUsers && selectedUsers.map((users) => {
          return (
            <div className="flex justify-between">
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
                <button className=" bg-white text-gray-900 text-sm px-4 py-1 rounded-full font-semibold">
                  Follow
                </button>
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
