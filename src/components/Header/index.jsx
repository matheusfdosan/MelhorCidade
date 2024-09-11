import "./styles.css"
import backIcon from "../../assets/back-icon.svg"
import { Link } from "react-router-dom"

export default function Header({linkTo, title}) {
  return (
    <header>
      <Link to={linkTo}>
        <img src={backIcon} alt="back-button" />
      </Link>
      <h1>{title}</h1>
    </header>
  )
}
