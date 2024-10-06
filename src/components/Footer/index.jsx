import "./styles.css"
import { Link } from "react-router-dom"

import homeIcon_filled from "../../assets/home-icon-filled.svg"
import homeIcon_outlined from "../../assets/home-icon-outlined.svg"

import darkPlusIcon_Outilined from "../../assets/dark-plus-icon-outlined.svg"
import plusIcon_filled from "../../assets/plus-icon-filled.svg"

import mapIcon_Outlined from "../../assets/map-icon-outlined.svg"
import mapIcon_filled from "../../assets/map-icon-filled.svg"

import userIcon_outlined from "../../assets/user-icon-outlined.svg"
import userIcon_filled from "../../assets/user-icon-filled.svg"

export default function Footer({ target }) {
  return (
    <footer id="footer_homepage">
      <div id="footer_container">
        <Link to="/homepage">
          <img
            src={target === 0 ? homeIcon_filled : homeIcon_outlined}
            alt="home-button"
          />
        </Link>
        <Link to="/report">
          <img
            src={target == 1 ? plusIcon_filled : darkPlusIcon_Outilined}
            alt="report-button"
          />
        </Link>
        <Link to="/map">
          <img
            src={target == 2 ? mapIcon_filled : mapIcon_Outlined}
            alt="profile-button"
          />
        </Link>
        <Link to="/account">
          <img
            src={target == 3 ? userIcon_filled : userIcon_outlined}
            alt="profile-button"
          />
        </Link>
      </div>
    </footer>
  )
}
