import "./styles.css"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [dash, setDash] = useState("user")

  useEffect(() => {
    document.title = "Melhor Cidade - Dashboard"
  }, [])

  return (
    <>
      <Header />
      <div id="dashboard">
        <aside>
          <div className="container">
            <ul>
              <li
                onClick={() => {
                  setDash("users")
                }}
              >
                Usuários
              </li>
              <li
                onClick={() => {
                  setDash("complaints")
                }}
              >
                Denúncias
              </li>
              <li
                onClick={() => {
                  setDash("trend")
                }}
              >
                Tendências de Denúncias
              </li>
            </ul>
          </div>
        </aside>

        <main>
          {dash == "users" && <Users_Dashboard />}
          {dash == "complaints" && <Complaints_Dashboard />}
          {dash == "trends" && <Trends_Dashboard />}
        </main>
      </div>

      <Footer />
    </>
  )
}