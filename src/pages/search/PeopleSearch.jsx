import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PeopleSearch = ({ searchPeople }) => {
  const currentUser = useSelector((state) => state.currUsr.value);
  const [userlist, setuserlist] = useState({});

  useEffect(() => {
    const userDirRef = ref(realTimeDatabase, "users/");
    onValue(userDirRef, (snapshot) => {
      let data = snapshot.val();
      console.log(data);
      setuserlist(data);
    });
  }, []);

  

  const filteredCurrentUser = searchPeople.filter((person) => {
    return person.userId !== currentUser.userId;
  });
  console.log("after filter");
  console.log(filteredCurrentUser);
  return (
    <>
      {filteredCurrentUser.length > 0 ? (
        filteredCurrentUser.map((person) => {
          return (
            <Link
              to={"/Home/" + person.username}
              className="flex w-full search-people-card"
              key={person.userId}
            >
              <div className="ml-3 my-3">
                <img
                  src={person.profile_picture}
                  alt="Profile picture"
                  className="rounded-full h-10 w-10 mr-5 cursor-pointer main-card-profile-pic"
                />
              </div>
              <div className="my-3 mr-3 w-full">
                <div className="flex justify-between">
                  <div>
                    <p className=" font-semibold">{person.displayName}</p>
                    <p className=" text-sm homelabelcolor pb-1">
                      {person.username}
                    </p>
                  </div>
                  <button className="bg-white text-gray-900 text-sm px-4 w-28 py-1 h-7 rounded-full font-semibold">
                    follow
                  </button>
                </div>
                <p>{person.bioData}</p>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="p-3">No user found</p>
      )}
    </>
  );
};

export default PeopleSearch;
