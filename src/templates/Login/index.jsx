import "./styles.css"
import engineerIcon from "../../assets/engineer-img.png"
import landImage from "../../assets/landscape.jpg"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Header from "../../components/Header"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Login() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useState
  useEffect
  return (
    <>
      <Header linkTo="/" title="Faça Login para continuar" />

      <main>
        <form className="form-login">
          <div className="login_container">

            <div className="login-signup">
              <Link to="/login">Login</Link>/
              <Link to="/signup">Cadastro</Link>
            </div>
            
            <h3>Entre na sua conta para prosseguir</h3>
            <p>
              Esse passo é necessário para garantir a segurança dos seus dados e
              personalizar a sua experiência na plataforma.
            </p>
            <div className="data">
              <Input
                label="E-mail"
                type="email"
                idName="email"
                placeholder="Ex: angelionaldo@gmail.com"
              />

              <Input
                label="Senha"
                type="password"
                idName="password"
                placeholder="Ex: 4@@28&22."
              />

              <Button
                title={"Fazer Login"}
                type={"submit"}
                style={"darkStyle"}
                linkTo={"/homepage"}
              />
            </div>
          </div>

          {windowWidth < 765 ? (
            <img src={engineerIcon} className="forMobile" alt="engineer-icon" />
          ) : (
            <img src={landImage} className="forDesktop" alt="landscape" />
          )}

          <Button
            title={"Fazer Login"}
            type={"submit"}
            style={"darkStyle"}
            linkTo={"/homepage"}
          />
        </form>
      </main>
    </>
  )
}
