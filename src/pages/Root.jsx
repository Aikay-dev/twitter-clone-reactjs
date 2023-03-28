import React from 'react'
import {getAuth} from 'firebase/auth'
import { Link } from 'react-router-dom'


const Root = () => {

  /* const auth = getAuth() */

  const percentages = 24+45+31
  return (
    
    <>
    <Link to = '/auth/Login'>TWITTER</Link>

    </>
  )
}

export default Root