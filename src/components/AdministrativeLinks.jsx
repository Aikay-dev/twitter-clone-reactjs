import React from 'react'
import { Link } from 'react-router-dom'


const AdministrativeLinks = ({currentDate}) => {
  return (
    <nav className="homepage-right-navbox ml-3 lg:m-auto pt-5 text-xs flex flex-wrap gap-x-3">
              <Link className="homepage-right-navbox-link">
                {" "}
                <span>Terms of Service</span>{" "}
              </Link>
              <Link className="homepage-right-navbox-link">
                {" "}
                <span>Privacy Policy</span>{" "}
              </Link>
              <Link className="homepage-right-navbox-link">
                {" "}
                <span>Cookie Policy</span>{" "}
              </Link>
              <Link className="homepage-right-navbox-link">
                {" "}
                <span>Accessibility</span>{" "}
              </Link>
              <Link className="homepage-right-navbox-link">
                {" "}
                <span>Ads info</span>{" "}
              </Link>
              <Link className="homepage-right-navbox-link">
                {" "}
                <span>More...</span>{" "}
              </Link>
              <span>{`\u00A9`} {currentDate.getFullYear()}, Tweeter, Inc.</span>
            </nav>
  )
}

export default AdministrativeLinks