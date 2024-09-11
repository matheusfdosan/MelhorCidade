import { Link } from "react-router-dom"
import "./styles.css"

export default function Button({ title, type, clickButton, style, linkTo }) {
    return <Link to={linkTo} className={style} type={type} onClick={clickButton}>{title}</Link>
}
