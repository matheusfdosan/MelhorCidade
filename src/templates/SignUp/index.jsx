import "./style.css"
import backIcon from "../../assets/back-icon.svg"
import plusIcon from "../../assets/plus.svg"
import { Link } from "react-router-dom"

export default function SignUp() {
  return (
    <>
      <header>
        <Link to="/">
          <img src={backIcon} alt="back-button" />
        </Link>
        <h1>Faça seu cadastro aqui </h1>
      </header>

      <main>
        <div className="Form">
          <div className="data">
            <div className="profile-picture">
              <h3>Foto de Perfil</h3>
              <label htmlFor="user-photo" className="custom-file-button">
                <img src={plusIcon} alt="plus-icon" />
              </label>
              <input
                type="file"
                alt="profile-picture"
                id="user-photo"
                required
              />
            </div>

            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Angelina Lional"
            />

            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Ex: angelionaldo@gmail.com"
            />

            <label htmlFor="age">Idade</label>
            <input
              type="number"
              name="age"
              id="age"
              required
              placeholder="Digite a sua idade"
            />

            <label htmlFor="address">Endereço</label>
            <input
              type="text"
              name="address"
              id="address"
              required
              placeholder="Ex: Rua do oste de Luz na sua cara"
            />

            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Crie uma senha"
            />
          </div>

          <button className="signup_btn" type="submit">
            <p>Cadastrar</p>
          </button>
        </div>
      </main>
    </>
  )
}
