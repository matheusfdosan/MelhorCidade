import "./style.css"
import Input from "../../components/Input"
import registerService from "../../utils/registerService"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import authService from "../../utils/authService"
import Loading from "../../components/Loading"
import errorGif from "../../assets/error.gif"

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState(false)
  const [axiosError, setAxiosError] = useState(false)

  useEffect(() => {
    document.title = "Melhor Cidade - Cadastro"
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (form.password === form.confirmPassword) {
      const response = await registerService(form)

      if (response.acess) {
        try {
          const response = await authService(form.email, form.password)

          if (response.serverAcess) {
            setLoading(false)

            localStorage.setItem(
              "Login",
              JSON.stringify({
                email: form.email,
                password: form.password,
              })
            )

            document.location.href = "/homepage"
          }
        } catch (err) {
          console.log(err)
        }
      } else if (response.name == "AxiosError") {
        setLoading(false)
        setAxiosError(true)

        setTimeout(() => {
          setAxiosError(false)
        }, 4000)
      }

      setConfirmPassword(false)
    } else {
      setConfirmPassword(true)
    }
  }

  return (
    <>
      <main id="signup_container">
        <div id="illustration"></div>
        <form onSubmit={handleSubmit} id="form_signup">
          <div id="form_inputs">
            <h1>MelhorCidade</h1>

            <h2>
              Cadastre-se e Descubra Todos os Benefícios da Nossa Plataforma
            </h2>

            <Input
              label="Nome"
              type="text"
              idName="name"
              placeholder="Digite o seu nome"
              onChangeInput={handleChange}
            />

            <Input
              label="E-mail"
              type="email"
              idName="email"
              placeholder="Digite o seu email"
              onChangeInput={handleChange}
            />

            <Input
              label="Endereço"
              type="text"
              idName="address"
              placeholder="Digite o seu endereço"
              onChangeInput={handleChange}
            />

            <Input
              label="Senha"
              type="password"
              idName="password"
              placeholder="Crie uma senha"
              onChangeInput={handleChange}
            />
            <Input
              label="Confirmar Senha"
              type="password"
              idName="confirmPassword"
              placeholder="Digite a sua senha novamente"
              onChangeInput={handleChange}
            />

            {confirmPassword && (
              <span style={{ color: "red" }}>As senhas não coincidem.</span>
            )}
          </div>

          {loading && <Loading />}

          {axiosError && (
            <div id="serverOff">
              <h1>MelhorCidade</h1>
              <h2>Puts!! Erro ao se conectar ao serviço. Tente mais tarde!</h2>
              <p>Erro 503 - Serviço Indisponível</p>
              <img src={errorGif} alt="error-gif" />
            </div>
          )}

          <p id="already_have_account">
            Você já tem uma conta? Então faça o{" "}
            <Link to={"/login"} className="make-login-link">
              Login
            </Link>
          </p>

          <button type="submit" id="register_submit_button">
            Cadastrar
          </button>

          <p id="i_agree">
            Ao se cadastrar, você concorda com os{" "}
            <Link to={"/terms-of-use"} className="make-login-link">
              Termos e a Política de privacidade
            </Link>
            .
          </p>
        </form>
      </main>
    </>
  )
}
