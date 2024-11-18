import "./styles.css"
import Input from "../../components/Input"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import authService from "../../utils/authService"

export default function Login() {
  const [loginEmail, setLoginEmail] = useState()
  const [loginPassword, setLoginPassword] = useState()

  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false)
      }, 12000)
    }
  }, [errorMessage])

  useEffect(() => {
    document.title = "Melhor Cidade - Login"
  }, [])

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    const authServiceResponse = await authService(loginEmail, loginPassword)

    if (authServiceResponse) {
      document.location.href = "/homepage"
      setErrorMessage(false)
    } else {
      setErrorMessage(true)
    }
  }

  const handleFocusInput = (e) => {
    const parentNode = e.target.parentElement
    parentNode.classList.add("focused")
  }

  const handleFocusOutInput = (e) => {
    const parentNode = e.target.parentElement
    parentNode.classList.remove("focused")
  }

  return (
    <>
      <main id="login_container">
        <div id="login_left">
          <h1>MelhorCidade</h1>
          <h2>Entre na sua conta para prosseguir</h2>

          <form method="post" onSubmit={handleSubmitLogin}>
            <Input
              label="E-mail"
              type="email"
              idName="email"
              tabIndex={1}
              placeholder="seuemail@email.com"
              onChangeInput={(e) => setLoginEmail(e.target.value)}
            />
            <Input
              label="Senha"
              type="password"
              idName="password"
              tabIndex={2}
              placeholder="••••••••••"
              onChangeInput={(e) => setLoginPassword(e.target.value)}
              onFocusInput={handleFocusInput}
              onFocusOutInput={handleFocusOutInput}
            />

            <span id={"error_msg_" + errorMessage}>
              Dados de login incorretos. Tente novamente
            </span>

            <p>
              Não tem uma conta?{" "}
              <Link to={"/signup"} id="register-link">
                Registre-se
              </Link>
            </p>

            <button type="submit" id="login_submit_button">
              Fazer Login
            </button>
          </form>
        </div>
        <div id="login_right"></div>
      </main>
    </>
  )
}
