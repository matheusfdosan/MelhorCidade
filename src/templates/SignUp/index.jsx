import "./style.css"
import Input from "../../components/Input"
import plusIcon from "../../assets/plus.svg"
import registerUser from "../../utils/registerUsers"
import Header from "../../components/Header"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    photo: null,
  })

  const [confirmPassword, setConfirmPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file)

      setForm({
        ...form,
        photo: file,
      })

      e.target.previousElementSibling.style.backgroundImage =
        "url(" + previewUrl + ")"
      e.target.previousElementSibling.style.border = ".4rem solid #3164C4"

      e.target.previousSibling.children[0].style.display = "none"
    } else {
      alert("Por favor, selecione um arquivo de imagem válido.")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password === form.confirmPassword) {
      registerUser(form)
      setConfirmPassword(false)
    } else {
      setConfirmPassword(true)
    }
  }

  return (
    <>
      <Header linkTo="/" title="Faça seu cadastro aqui" />

      <main>
        <form onSubmit={handleSubmit} className="form-signup">
          <div className="data">
            <div className="signup-text">
              <div className="login-signup">
                <Link to="/login">Login</Link>/
                <Link to="/signup">Cadastro</Link>
              </div>

              <h2>
                Cadastre-se e Descubra Todos os Benefícios da Nossa Plataforma
              </h2>
              <p>
                Crie sua conta para acessar todos os recursos da plataforma.
                Basta fornecer algumas informações básicas para concluir o
                cadastro e começar a aproveitar todos os benefícios disponíveis.
              </p>
            </div>

            <div className="name-age">
              <Input
                label="Nome"
                type="text"
                idName="name"
                placeholder="Digite o seu nome"
                onChangeInput={handleChange}
              />
              {/* <Input
                label="Idade"
                type="number"
                idName="age"
                placeholder="Digite a sua idade"
                onChangeInput={handleChange}
                maximum={120}
                minimum={1}
              /> */}
            </div>
            <Input
              label="E-mail"
              type="email"
              idName="email"
              placeholder="Digite o seu email"
              onChangeInput={handleChange}
            />

            <Input
              label="Telefone"
              type="tel"
              idName="phone"
              placeholder="Digite o seu telefone"
              onChangeInput={handleChange}
              maximumOfLetters={13}
            />
            <Input
              label="Endereço"
              type="text"
              idName="address"
              placeholder="Digite o seu endereço"
              onChangeInput={handleChange}
            />
            <div className="password-confirm-password">
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
            </div>

            {confirmPassword && (
              <span style={{ color: "red" }}>As senhas não coincidem.</span>
            )}
          </div>

          <input
            type="submit"
            value="Cadastrar"
            className="registerSubmitButton"
          />
        </form>
      </main>
    </>
  )
}

/*
            <div className="profile-picture">
              <h3>Foto de Perfil</h3>
              <label htmlFor="user-photo" className="custom-file-button">
                <img src={plusIcon} alt="plus-icon" />
              </label>
              <input
                type="file"
                alt="profile-picture"
                id="user-photo"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
*/
