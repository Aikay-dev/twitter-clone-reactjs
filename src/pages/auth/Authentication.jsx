import { Outlet } from "react-router-dom";

const Authentication = () => {
  return (
    <>
      <div className="authentication h-screen overflow-y-scroll md:pt-8 pt-0 flex justify-center items-center">
        <Outlet />
      </div>
    </>
  );
};

export default Authentication;
