import "./styles.css"
import { Link } from "react-router-dom"
import homeIcon_filled from "../../assets/home-icon-filled.svg"
import reportIcon from "../../assets/report-icon.svg"
import userIcon_outlined from "../../assets/user-icon-outlined.svg"

export default function Footer_homepage() {
  return (
    <footer id="footer_homepage">
      <div id="footer_container">
        <Link to="/homepage">
          <img src={homeIcon_filled} alt="home-button" />
        </Link>
        <Link to="explorer">
          <img src={reportIcon} alt="report-button" />
        </Link>
        <Link to="account">
          <img src={userIcon_outlined} alt="profile-button" />
        </Link>
      </div>
    </footer>
  )
}
