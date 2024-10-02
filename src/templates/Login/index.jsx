import "./styles.css"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { Link } from "react-router-dom"

export default function Login() {
  return (
    <>
      <main id="login_container">
        <div id="login_left">
          <h1>MelhorCidade</h1>
          <h2>Entre na sua conta para prosseguir</h2>

          <form>
            <Input
              label="E-mail"
              type="email"
              idName="email"
              placeholder="seuemail@email.com"
            />
            <Input
              label="Senha"
              type="password"
              idName="password"
              placeholder="••••••••••"
            />

            <p>
              Não tem uma conta? <Link to={"/signup"}>Registre-se</Link>
            </p>
            
            <Button
              title={"Fazer Login"}
              type={"submit"}
              style={"darkStyle"}
              linkTo={"/homepage"}
            />
          </form>
        </div>
        <div id="login_right"></div>
      </main>
    </>
  )
}
