import React from 'react'
import { Link } from 'react-router-dom';

const HomeButton = () => {
  return (
    <Link to="/">
    <button  className="back-home" >
      Back to Home
    </button>
  </Link>
  )
}

export default HomeButton