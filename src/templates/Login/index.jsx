import "./style.css"
import backIcon from "../../assets/back-icon.svg"
import engineerIcon from "../../assets/engineer-img.png"
import { Link } from "react-router-dom"

export default function Login() {
  return (
    <>
      <header>
        <Link to="/">
          <img src={backIcon} alt="back-button" />
        </Link>
        <h1>Faça Login para continuar </h1>
      </header>

      <main>
        <div className="Form">
          <div className="data">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ex: angelionaldo@gmail.com"
              required
            />

            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Ex: 4@@28&22."
              required
            />
          </div>
          <img src={engineerIcon} alt="engineer-icon" />

          <button className="login_btn" type="submit">
            <p>Fazer Login</p>
          </button>
        </div>
      </main>
    </>
  )
}
