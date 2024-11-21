import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "./styles.css"
import Posts from "../../components/Posts"
import Input from "../../components/Input"
import { useEffect, useState } from "react"
import FooterLinks from "../../components/FooterLinks"

export default function Homepage() {
  const [turnState, setTurnState] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const cookie = localStorage.getItem("CookieId")
    if (!cookie) {
      document.location.href = "/login"
    } else {
      document.title = "Melhor Cidade - Página Inicial"
    }
  }, [])

  const handleLoadMoreBtn = () => {
    if (hasMore) {
      setTurnState(turnState + 1)
    }
  }

  return (
    <>
      <Header />
      <main id="users_posts">
        <h2>Postagens mais relevantes</h2>

        <div id="search_complaints_container">
          <Input
            type="search"
            idName="search_complaints"
            placeholder="Pesquise a denúcia"
          />
          <button>Pesquisar</button>
        </div>

        <Posts turn={turnState} setHasMore={setHasMore} />
        <button
          id="load-more"
          onClick={handleLoadMoreBtn}
          className={"button-is-" + !hasMore}
        >
          {hasMore ? "Carregar mais" : "Fim das denúncias"}
        </button>
      </main>

      <div id="homepage_footer">
        <FooterLinks />
      </div>

      <Footer target={0} />
    </>
  )
}
