import { Link } from "react-router-dom";
import "./styles.css"

export default function FooterLinks() {
  return (
    <footer>
      <div className="container">
        <em>&copy; 2024 MelhorCidade.</em>
        <ul>
          <li>
            <Link to="/about">Sobre</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Cadastro</Link>
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
            <Link to="">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
