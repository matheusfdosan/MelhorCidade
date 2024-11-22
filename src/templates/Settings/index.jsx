import "./styles.css"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import FooterLinks from "../../components/FooterLinks"
import ThemeContext from "../../utils/themeContext"

import rightArrow from "../../assets/right-arrow-icon.svg"

import { Link } from "react-router-dom"
import { useEffect, useContext, useState } from "react"

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [userName, setUserName] = useState("John Doe")
  const [userEmail, setUserEmail] = useState("John Doe")

  useEffect(() => {
    const cookie = localStorage.getItem("CookieId")
    if (!cookie) {
      document.location.href = "/login"
    } else {
      document.title = "Melhor Cidade - Configurações"
      setUserName(JSON.parse(cookie).username)
      const login = localStorage.getItem("Login")
      const email = JSON.parse(login).email
      setUserEmail(email)
    }
  }, [])

  const handleLogOut = () => {
    localStorage.removeItem("CookieId")
    document.location.href = "/login"
  }

  return (
    <>
      <Header configPage={true} />
      <main id="settings_container">
        <section id="your_account">
          <h2>Sua Conta</h2>
          <div className="settings">
            <h3>
              <Link to="/account">{userName}</Link>
            </h3>
            <p>{userEmail}</p>

            <div id="sign_out">
              <h3>Sair da conta</h3>
              <span onClick={handleLogOut}>Deslogar</span>
            </div>
          </div>
        </section>
        <section id="visibility">
          <h2>Visibilidade</h2>
          <div className="settings">
            <p>Tema Escuro</p>
            <div className={`wrapper ${theme}`} onClick={toggleTheme}>
              <div id="toggler"></div>
            </div>
          </div>
        </section>
        <section id="manage_account">
          <h2>Gerenciar Conta</h2>
          <ul className="settings">
            <li>
              <p>Seu Endereço</p>
              <span></span>
              <img src={rightArrow} alt="right-arrow" />
            </li>
          </ul>
        </section>
      </main>

      <div id="settings_footer">
        <FooterLinks />
      </div>

      <Footer />
    </>
  )
}
