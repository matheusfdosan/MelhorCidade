import "./styles.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import plusIcon from "../../assets/plus-icon.svg"
import rightArrow from "../../assets/right-arrow-icon.svg"
import settingsIcon from "../../assets/settings-icon.svg"

export default function Header() {
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
        <Link to="/homepage">
          <h1>MelhorCidade</h1>
        </Link>

        <nav>
          <ul>
            <li>
              <Link to={"/report"}>
                <img src={plusIcon} alt="plus_icon" />
                Denunciar
              </Link>
            </li>
          </ul>

          <Link to={"/settings"} id="settings_btn">
            <img src={settingsIcon} alt="configs-btn" />
          </Link>

          <div id="burguer">
            <div
              id="lines"
              className={modalVisibility === "active" ? "cross" : "active"}
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
          <Link to={"/map"}>
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
