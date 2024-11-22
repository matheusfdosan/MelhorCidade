import "./styles.css"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import plusIcon from "../../assets/plus-icon.svg"
import rightArrow from "../../assets/right-arrow-icon.svg"
import settingsIconFilled from "../../assets/settings-icon-filled.svg"
import settingsIconOutlined from "../../assets/settings-icon-outlined.svg"
import dashboardIcon from "../../assets/dashboard-icon.svg"

export default function Header() {
  const [modalVisibility, setModalVisibility] = useState("deactivate")
  const [adminMode, setAdminMode] = useState(false)

  const handleClickBurguer = () => {
    if (modalVisibility === "active") {
      setModalVisibility("deactivate")
    } else {
      setModalVisibility("active")
    }
  }

  useEffect(() => {
    const acess = localStorage.getItem("CookieId")
    if (JSON.parse(acess).userType !== "comum") {
      setAdminMode(true)
    }
  }, [])

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
                Nova Denúncia
              </Link>
            </li>
          </ul>

          {adminMode && (
            <Link to={"/dashboard"} id="dashboard_btn">
              <img src={dashboardIcon} alt="dashboard-icon" />
            </Link>
          )}

          <Link to={"/settings"} id="settings_btn">
            {document.URL.includes("settings") ? (
              <img src={settingsIconFilled} alt="configs-btn" />
            ) : (
              <img src={settingsIconOutlined} alt="configs-btn" />
            )}
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
          <Link to={"/account"}>
            Sua Conta
            <img src={rightArrow} alt="right-arrow" />
          </Link>
          <hr />

          {adminMode && (
            <>
              <Link to={"/dashboard"}>
                Painel de Administração
                <img src={rightArrow} alt="right-arrow" />
              </Link>
              <hr />
            </>
          )}
          <Link to={"/settings"}>
            Configurações
            <img src={rightArrow} alt="right-arrow" />
          </Link>
        </div>
      </div>
    </header>
  )
}
