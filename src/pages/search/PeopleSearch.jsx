import React from "react";
import { Link } from "react-router-dom";

const PeopleSearch = ({ searchPeople }) => {
  console.log(searchPeople);
  return (
    <>
      {searchPeople.length > 0 ? (
        searchPeople.map((person) => {
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
