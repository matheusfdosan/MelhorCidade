import { Link } from "react-router-dom"
import "./styles.css"

export default function FooterLinks() {
  return (
    <footer>
      <div className="container">
        <div id="links">
          <div id="footer_slogan">
            <strong>MelhorCidade</strong>
            <div id="slogan">
              <p>Conectando Vizinhos,</p>
              <p>Transformando Comunidades:</p>
              <p>Informe, Participe, Faça a diferença</p>
            </div>
          </div>
          <ul>
            <li>
              <strong>Links importantes</strong>
            </li>
            <li>
              <Link to="/about">Sobre</Link>
            </li>
            <li>
              <Link
                to="https://github.com/matheusfdosan/MelhorCidade_FrontEnd"
                target="_blank"
              >
                Github
              </Link>
            </li>
            <li>
              <Link to="/contact">Contato</Link>
            </li>
            <li>
              <Link to="/collaborators">Colaboradores</Link>
            </li>
          </ul>
        </div>

        <em>&copy; 2024 MelhorCidade.</em>
      </div>
    </footer>
  )
}
