import maps from "../../assets/person-on-maps.png"
import laptopBoy from "../../assets/person-with-laptop.png"
import { Link } from "react-router-dom"
import "./styles.css"

export default function Landing() {
  return (
    <>
      <header>
        <h1>Olá, seja bem-vindo(a)!</h1>
      </header>
      <main>
        <div className="informative-text">
          <div>
            <h2>MelhorCidade</h2>
            <p>
              A plataforma para ajudar a sua cidade, saiba o que pode ser feito
              para melhorar sua qualidade vida.
            </p>
          </div>
          <img
            className="laptop-boy"
            src={laptopBoy}
            alt="person-with-laptop"
          />
        </div>

        <div className="more-info">
          <h2>Localize problemas estruturais em sua cidade.</h2>
          <img src={maps} alt="person-on-maps" />
        </div>
      </main>
      <footer>
        <Link to="/login" className="login-btn">
          Login
        </Link>
        <Link to="/signup" className="signup-btn">
          Cadastrar
        </Link>
      </footer>
    </>
  )
}
