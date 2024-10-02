import "./styles.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import rightArrow from "../../assets/right-arrow-icon.svg"

export default function Header_homepage() {
  const [modalVisibility, setModalVisibility] = useState("deactivate")

  const handleClickBurguer = () => {
    if (modalVisibility === "active") {
      setModalVisibility("deactivate")
    } else {
      setModalVisibility("active")
    }
  }

  return (
    <header id="header_homepage">
      <div id="header_container">
        <h1>MelhorCidade</h1>

        <nav>
          <ul>
            <li>
              <Link to={"/report"}>Denunciar</Link>
            </li>
          </ul>
          <div id="burguer">
            <div
              id="lines"
              className={modalVisibility === "active" && "cross"}
              onClick={handleClickBurguer}
            >
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </nav>
      </div>
      <div className={`burguer_menu ${modalVisibility}`}>
        <div id="nav_item">
          <hr />
          <Link to={"/maps"}>
            Ver Mapa
            <img src={rightArrow} alt="right-arrow" />
          </Link>
          <hr />
          <Link to={"/notices"}>
            Notícias
            <img src={rightArrow} alt="right-arrow" />
          </Link>
          <hr />
          <Link to={"/doubts"}>
            Dúvidas
            <img src={rightArrow} alt="right-arrow" />
          </Link>
          <hr />
          <Link to={"/settings"}>
            Configurações
            <img src={rightArrow} alt="right-arrow" />
          </Link>
        </div>
      </div>
    </header>
  )
}
