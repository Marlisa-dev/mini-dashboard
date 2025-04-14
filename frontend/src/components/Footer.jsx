import React from 'react'
import styles from './Footer.module.css'
import { FaHeart } from "react-icons/fa";


const Footer = () => {
  return (
    <div className={styles.footer}>
        <p>by <a href='https://x.com/eastramses' target='_blank'>@EastRamses</a></p>
        <FaHeart className={styles.footerIcon} style={{marginLeft: "4px"}}/>
    </div>
  )
}

export default Footer