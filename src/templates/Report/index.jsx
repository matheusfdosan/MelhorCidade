import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { useEffect } from "react"
import "./styles.css"

export default function Report() {
  useEffect(() => {
    document.title = "Melhor Cidade - Fazer Denúncia"
  }, [])

  return (
    <>
      <Header />
      <main></main>
      <Footer target={1} />
    </>
  )
}
