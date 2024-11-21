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
          <div id="user_datas">
            <h3>Gregory Singleton</h3>
            <div>
              <span className="amout">3</span>
              <span className="of_something">Postagens</span>
            </div>
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
