import "./styles.css"
import { useEffect } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Posts from "../../components/Posts"
import FooterLinks from "../../components/FooterLinks"

export default function Profile() {
  useEffect(() => {
    const cookie = localStorage.getItem("CookieId")
    if (!cookie) {
      document.location.href = "/login"
    } else {
      document.title = "Melhor Cidade - Perfil"
    }
  }, [])

  return (
    <>
      <Header />
      <main id="profile_container">
        <div id="user_info">
          <div id="profile_picture_container">
            <img
              src="https://www.designi.com.br/images/preview/12161378.jpg"
              alt="user_picture"
            />
          </div>

          <div id="user_datas">
            <h3>Gregory Singleton</h3>
            <ul>
              <li>
                <span className="amout">13</span>
                <span className="of_something">Seguidores</span>
              </li>
              <li>
                <span className="amout">43</span>
                <span className="of_something">Seguindo</span>
              </li>
              <li>
                <span className="amout">3</span>
                <span className="of_something">Postagens</span>
              </li>
            </ul>
          </div>
        </div>

        <h2>Suas Postagens</h2>
          <Posts />
        </main>

      <div id="profile_footer">
        <FooterLinks />
      </div>

      <Footer target={3} />
    </>
  )
}
