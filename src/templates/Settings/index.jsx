import "./styles.css"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import FooterLinks from "../../components/FooterLinks"
import ThemeContext from "../../utils/themeContext"

import rightArrow from "../../assets/right-arrow-icon.svg"

import { Link } from "react-router-dom"
import { useEffect, useContext } from "react"

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    const cookie = localStorage.getItem("CookieId")
    if (!cookie) {
      document.location.href = "/login"
    } else {
      document.title = "Melhor Cidade - Configurações"
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
              <Link to="/account">Gregory Singleton</Link>
            </h3>
            <p>gregory.singleton@email.com</p>

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
              <p>Mudar senha</p>
              <img src={rightArrow} alt="right-arrow" />
            </li>
            <li>
              <p>Endereço</p>
              <span>Ghana, Willie Morgan, 62</span>
              <img src={rightArrow} alt="right-arrow" />
            </li>
            <li>
              <p>Telefone</p>
              <span>+55 91234-5678</span>
              <img src={rightArrow} alt="right-arrow" />
            </li>
          </ul>
        </section>
        <section id="delete_account">
          <p>Deletar Conta</p>
          <button>Deletar</button>
        </section>
      </main>

      <div id="settings_footer">
        <FooterLinks />
      </div>

      <Footer />
    </>
  )
}
