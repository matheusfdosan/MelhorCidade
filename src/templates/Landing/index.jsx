import "./styles.css"
import { Link } from "react-router-dom"
import RecentComplaints from "../../components/RecentComplaints"

export default function Landing() {
  return (
    <>
      <header id="landing_header">
        <div className="container" inert>
          <h1>MelhorCidade</h1>

          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Cadastro</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main id="landign_main">
        <section id="landing_hero">
          <div className="container">
            <h2>
              Transforme Sua cidade com um <em>Clique</em>
            </h2>
            <p id="hero_description">
              Viu um problema na sua cidade? Não fique só olhando. Use a
              plataforma MelhorCidade para informar sobre buracos, falta de
              iluminação, problemas estruturais, qualquer coisa que não esteja
              nos conformes da sua cidade.
            </p>
            <p id="slogan-text">Informe, Participe e Faça a Diferença!</p>

            <Link to="/signup">Comece Já</Link>
          </div>
        </section>

        <section id="landing_complaints">
          <div className="container">
            <h2>
              Leia algumas das denúncias mais recentes em nossa plataforma.
            </h2>
          </div>
          <RecentComplaints />
        </section>

        <section id="landing_video">
          <div className="container">
            <h2>Veja o que está acontecendo nas cidades</h2>

            <div id="info_video">
              <div id="video_description">
                <p>
                  Esse vídeo apresena a vida de alguns dos moradores da
                  comunidade do Pedreira, em São Paulo. Eles falam sobre os
                  problemas que ocorrem na cidade e como isso afeta a vida deles
                  e de seus filhos.
                </p>
                <p>
                  É através da colaboração de todos que conseguimos fazer a
                  diferença. A verdadeira transformação acontece quando a soma
                  das partes se torna mais poderosa do que as ações individuais,
                  promovendo impacto positivo e mudanças duradouras na
                  sociedade.
                </p>
              </div>
              <iframe
                src="https://player.vimeo.com/video/33982065?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                width="640"
                height="230"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title="Brasil."
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
            <em>&copy; 2024 MelhorCidade.</em>
          <ul>
            <li>
              <Link to="/about">Sobre</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Cadastro</Link>
            </li>
            <li>
              <Link to="https://github.com/matheusfdosan/MelhorCidade_FrontEnd" target="_blank">Github</Link>
            </li>
            <li>
              <Link to="">Contact</Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}
