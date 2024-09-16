import "./styles.css"
import backIcon from "../../assets/back-icon.svg"
import engineerIcon from "../../assets/engineer-img.png"
import { Link } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Header from "../../components/Header"

export default function Login() {
  return (
    <>
      <Header linkTo="/" title="Faça Login para continuar" />

      <main>
        <form action="" method="post" className="form">
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
          </div>
          <img src={engineerIcon} alt="engineer-icon" />

          <Button title={"Fazer Login"} type={"submit"} style={"darkStyle"} linkTo={"/homepage"}/>
        </form>
      </main>
    </>
  )
}
