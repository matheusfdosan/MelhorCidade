import "./style.css"
import Input from "../../components/Input"
import plusIcon from "../../assets/plus.svg"
import Button from "../../components/Button"
import Header from "../../components/Header"

export default function SignUp() {
  return (
    <>
      <Header linkTo="/" title="Faça seu cadastro aqui" />

      <main>
        <form action="" method="post" className="form">
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

            <Input
              label="Nome"
              type="text"
              idName="name"
              placeholder="Digite o seu nome"
            />

            <Input
              label="E-mail"
              type="email"
              idName="email_signup"
              placeholder="Digite o seu email"
            />

            <Input
              label="Idade"
              type="number"
              idName="age"
              placeholder="Digite a sua idade"
            />

            <Input
              label="Endereço"
              type="text"
              idName="address"
              placeholder="Digite o seu endereço"
            />

            <Input
              label="Senha"
              type="password"
              idName="password_signup"
              placeholder="Crie uma senha"
            />

            <Input
              label="Confirmar Senha"
              type="password"
              idName="confirm_password"
              placeholder="Digite a sua senha novamente"
            />
          </div>

          <Button title={"Cadastro"} type={"submit"} style={"darkStyle"} />
        </form>
      </main>
    </>
  )
}
