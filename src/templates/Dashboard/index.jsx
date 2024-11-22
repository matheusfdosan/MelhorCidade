import "./styles.css"

import Header from "../../components/Header"
import Footer from "../../components/Footer"

import { useEffect, useState } from "react"
import authService from "../../utils/authService"
import Posts from "../../components/Posts"

export default function Dashboard() {
  const [turnState, setTurnState] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const handleLoadMoreBtn = () => {
    if (hasMore) {
      setTurnState(turnState + 1)
    }
  }

  const verifyAcess = async () => {
    const loginData = localStorage.getItem("Login")
    const email = JSON.parse(loginData).email
    const password = JSON.parse(loginData).password

    const response = await authService(email, password)

    return response.userType
  }

  useEffect(() => {
    document.title = "Melhor Cidade - Painel de Administrador"

    const cookie = localStorage.getItem("CookieId")
    if (!cookie) {
      document.location.href = "/login"
    } else {
      document.title = "Melhor Cidade - Página Inicial"

      const response = verifyAcess()

      const acess = localStorage.getItem("CookieId")
      const acessParsed = JSON.parse(acess)
      acessParsed.userType = response
      localStorage.setItem("CookieId", JSON.stringify(acessParsed))

      if (response == "comum") {
        console.log(response)
        document.location.href = "/homepage"
      }
    }
  }, [])

  return (
    <>
      <Header />
      <div id="dashboard">
        <main>
          <h2>Todas as Postagens:</h2>
          <div id="posts">
            <Posts turn={turnState} setHasMore={setHasMore} />
          </div>
          <button
            id="load-more"
            onClick={handleLoadMoreBtn}
            className={"button-is-" + !hasMore}
          >
            {hasMore ? "Carregar mais" : "Fim das denúncias"}
          </button>
        </main>
      </div>

      <Footer />
    </>
  )
}
