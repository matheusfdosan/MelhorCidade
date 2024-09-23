import maps from "../../assets/person-on-maps.png"
import illustration from "../../assets/illustration.png"
import "./styles.css"
import Button from "../../components/Button"

export default function Landing() {
  return (
    <>
      <header>
        <h1>Olá, seja bem-vindo(a)!</h1>
      </header>
      <main>
        <div className="informative-text">
          <div>
            <h2>MelhorCidade</h2>
            <p>
              A plataforma para ajudar a sua cidade, saiba o que pode ser feito
              para melhorar sua qualidade vida.
            </p>
          </div>
          <img
            className="illustration-image"
            src={illustration}
            alt="illustration"
          />
        </div>



        <div className="more-info">
          <h2>Localize problemas estruturais em sua cidade.</h2>
          <img src={maps} alt="person-on-maps" />
        </div>
      </main>
      <footer>
        <Button title={"Login"} type={"button"} style={"darkStyle"} linkTo={"/login"} />
        <Button title={"Cadastrar"} type={"button"} style={"borderStyle"} linkTo={"/signup"} />
      </footer>
    </>
  )
}
