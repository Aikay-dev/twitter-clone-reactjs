import { useEffect } from "react";
import HomeRight from "./Home/HomeRight";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { mobileNavLeftState } from "../store";
import { realTimeDatabase } from "../config/firebase";
import { ref, update } from "firebase/database";
import NotificationStream from "../database/NotificationStream";

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
                src={currentUser? currentUser.profile_picture : ""}
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
          <div className=" h-60"></div>
        </section>
      </section>

      <HomeRight />
    </>
  );
}

export default NotificationPage;
