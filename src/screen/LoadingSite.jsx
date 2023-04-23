import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas);
library.add(fab);
library.add(far);

const LoadingSite = () => {
  return (
    <div className='main-tweeter-loading h-screen w-screen bg-black text-5xl flex items-center justify-center'>
        <FontAwesomeIcon icon="fab fa-twitter" />
    </div>
  )
}

export default LoadingSite