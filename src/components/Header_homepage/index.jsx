import "./styles.css"
import { Link } from "react-router-dom"

export default function Header_homepage() {
  return (
    <header id="header_homepage">
      <div id="header_container">
        <h1>Página Inicial</h1>

        <nav>
          <ul>
            <li>
              <Link to={"/explorer"}>Home</Link>
            </li>
            <li>
              <Link to={"/explorer"}>Explorar</Link>
            </li>
            <li>
              <Link to={"/explorer"}>Sua Conta</Link>
            </li>
          </ul>
          <div id="burguer">
          <div id="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        </nav>


      </div>
    </header>
  )
}
