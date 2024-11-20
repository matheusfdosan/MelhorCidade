import "./styles.css"
import Input from "../../components/Input"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import authService from "../../utils/authService"
import Loading from "../../components/Loading"
import errorGif from "../../assets/error.gif"

export default function Login() {
  const [loginEmail, setLoginEmail] = useState()
  const [loginPassword, setLoginPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [axiosError, setAxiosError] = useState(false)

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
    setLoading(true)
    const authServiceResponse = await authService(loginEmail, loginPassword)

    if (authServiceResponse) {
      setLoading(false)
      document.location.href = "/homepage"
      setErrorMessage(false)
    } else if (authServiceResponse && authServiceResponse.name  == "AxiosError") {
      setLoading(false)
      setAxiosError(true)

      setTimeout(() => {
        setAxiosError(false)
      }, 4000)
    } else {
      setLoading(false)
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
          <h2>Faça login para prosseguir</h2>

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

            {axiosError && (
              <div id="serverOff">
                <h2>Erro ao se conectar ao serviço. Tente mais tarde!</h2>
                <img src={errorGif} alt="error-gif" />
              </div>
            )}
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

      {loading && <Loading />}
    </>
  )
}
