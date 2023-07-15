import React, { useState } from 'react'
import Search from './Search'
import { useSelector, useDispatch } from "react-redux";

const SearchWrapper = () => {
    const key = useSelector((state) => state.mntSt.value);
    
  return (
    <Search key={key} />
  )
}

export default SearchWrapper