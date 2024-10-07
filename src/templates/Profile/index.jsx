import "./styles.css"
import { useEffect } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Posts from "../../components/Posts"

export default function Profile() {
  useEffect(() => {
    document.title = "Melhor Cidade - Perfil"
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
        <div id="posts_container">
          <Posts />
        </div>
      </main>
      <Footer target={3} />
    </>
  )
}
