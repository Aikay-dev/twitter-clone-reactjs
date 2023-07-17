import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ContactTab() {
  return (
    <div className="p-3">
      <p className="homelabelcolor text-sm">
        Feel free to contact me via any of these platforms
      </p>
      <div className="flex flex-col pt-5 gap-3">
        <a href="https://emmanuelfestus.netlify.app">
          <span>
            <FontAwesomeIcon icon="fa-solid fa-link" />
          </span>
          <span> https://emmanuelfestus.netlify.app</span>
        </a>
        <div>
          <span>
            <FontAwesomeIcon icon="fa-solid fa-phone" />
          </span>
          <span> 081513288790</span>
        </div>
        <a href="https://twitter.com/general_ik">
          <span>
            <FontAwesomeIcon icon="fa-brands fa-twitter" />
          </span>
          <span> @general_ik</span>
        </a>
        <a href="https://github.com/GeneralAike">
          <span>
            <FontAwesomeIcon icon="fa-brands fa-github" />
          </span>
          <span> @GeneralAike</span>
        </a>
        <div>
          <span>
            <FontAwesomeIcon icon="fa-solid fa-envelope" />
          </span>
          <span> Emmanese2020@gmail.com</span>
        </div>
      </div>
    </div>
  );
}

export default ContactTab;
