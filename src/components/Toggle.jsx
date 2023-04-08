import React, { useState, useEffect } from "react";

const Toggle = ({ permission }) => {
  const [toggleHolder, setToggleHolder] = useState({
    height: "15px",
    width: "40px",
    backgroundColor: "rgb(107, 201, 251)",
    borderRadius: "100px",
  });

  const [toggleTab, setToggleTab] = useState({
    height: "20px",
    width: "20px",
    backgroundColor: "rgb(29, 155, 240)",
    borderRadius: "100px",
    right: 0,
  });

  useEffect(() => {
    if (permission) {
      if (toggleHolder.backgroundColor === "rgb(107, 201, 251)") {
        setToggleTab({
          height: "20px",
          width: "20px",
          backgroundColor: "rgb(250,250,250)",
          borderRadius: "100px",
        });

        setToggleHolder({
          height: "15px",
          width: "40px",
          backgroundColor: "rgb(147,147,147)",
          borderRadius: "100px",
        });
      } else {
        setToggleTab({
          height: "20px",
          width: "20px",
          backgroundColor: "rgb(29, 155, 240)",
          borderRadius: "100px",
          right: 0,
        });

        setToggleHolder({
          height: "15px",
          width: "40px",
          backgroundColor: "rgb(107, 201, 251)",
          borderRadius: "100px",
        });
      }
    }
  }, [permission]);

  const handleClick = () => {
    if (toggleHolder.backgroundColor === "rgb(107, 201, 251)") {
      setToggleTab({
        height: "20px",
        width: "20px",
        backgroundColor: "rgb(250,250,250)",
        borderRadius: "100px",
      });

      setToggleHolder({
        height: "15px",
        width: "40px",
        backgroundColor: "rgb(147,147,147)",
        borderRadius: "100px",
      });
    } else {
      setToggleTab({
        height: "20px",
        width: "20px",
        backgroundColor: "rgb(29, 155, 240)",
        borderRadius: "100px",
        right: 0,
      });

      setToggleHolder({
        height: "15px",
        width: "40px",
        backgroundColor: "rgb(107, 201, 251)",
        borderRadius: "100px",
      });
    }
  };
  return (
    <div
      style={toggleHolder}
      className="blue-toggle-holder relative flex items-center cursor-pointer"
    >
      <div className="toggle-body"></div>
      <div style={toggleTab} className="toggle-tab absolute "></div>
    </div>
  );
};

export default Toggle;
