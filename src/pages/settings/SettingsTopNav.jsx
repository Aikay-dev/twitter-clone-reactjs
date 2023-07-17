import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SettingsTopNav = ({ navText }) => {
  return (
    <div className="personalization-and-data-head-nav flex text-lg items-center mt-1 mb-6">
      <div
        className="personalization-and-data-head-nav-arrow-holder flex items-center justify-center cursor-pointer rounded-full h-8 w-8 ml-2 mt-2 mr-8"
        onClick={() => window.history.back()}
      >
        <span className="text-base">
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </span>
      </div>
      <p className="font-black">{navText}</p>
    </div>
  );
};

export default SettingsTopNav;
