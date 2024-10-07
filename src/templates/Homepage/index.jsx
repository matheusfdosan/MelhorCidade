import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "./styles.css"
import Posts from "../../components/Posts"
import Input from "../../components/Input"
import { useEffect } from "react"

export default function Homepage() {
  useEffect(() => {
    document.title = "Melhor Cidade - Página Inicial"
  }, [])

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

        <div id="classify">
          <p>Classificar por: </p>

          <select id="choose_classify">
            <option>Relevantes</option>
            <option>Mais recentes</option>
            <option>Mais antigos</option>
          </select>
        </div>

        <Posts />
      </main>
      <Footer target={0} />
    </>
  )
}
