import React from 'react'

const step2 = () => {
  return (
    <div>
      <div className="flex items-center ">
        <Link
          onClick={() => {
            dispatch(blurChangeState({ display: "none" }));
          }}
          to="/Home/Explore"
          className="ex flex justify-center items-center cursor-pointer rounded-full"
        >
          <FontAwesomeIcon icon="fas fa-xmark " />
        </Link>
        <p className="ml-8 font-bold text-lg">Step 2 of 5</p>        
      </div>
    </div>
  )
}

export default step2
