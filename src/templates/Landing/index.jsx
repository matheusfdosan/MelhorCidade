import "./styles.css"
import { Link } from "react-router-dom"
import FooterLinks from "../../components/FooterLinks"
import { useState, useEffect } from "react"
import redMarker from "../../assets/red-marker.svg"
import relevantButton from "../../assets/like-icon.svg"


export default function Landing() {
  const [postsData, setPostsData] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/posts.json")
        const result = await response.json()
        return result
      } catch (error) {
        console.log("Failed to fetch posts:" + error)
        throw error
      }
    }

    fetchPosts()
      .then((response) => {
        setPostsData(response)
      })
      .catch((err) => {
        console.log("Error to get posts data: " + err)
      })
  }, [])

  const handlePostClick = () => {
    document.location.href = "/login"
  }

  return (
    <>
      <header id="landing_header">
        <div className="container">
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
            <Link to="/signup">Comece Já</Link>
          </div>
        </section>

        <section id="landing_complaints">
          <div className="container">
            <h2>
              Leia algumas das denúncias mais recentes em nossa plataforma.
            </h2>
          </div>

          <div id="posts_container">
            <div id="posts">
              {postsData.map((data) => {
                return (
                  <div
                    className="post"
                    key={data.id}
                    id={data.id}
                  >
                    <img
                      src={data.image[0]}
                      alt={"Imagem: " + data.title}
                      title={"Imagem: "}
                    />
                    <div className="post-content">
                      <div className="post-header">
                        <div className="locale">
                          <img src={redMarker} alt="red-marker" />
                          <p>{data.location.address}</p>
                        </div>
                        <p className="date">{data.date}</p>
                      </div>
                      <div className="post-body">
                        <p>
                          <strong>{data.owner}:</strong>{" "}
                          {data.description}
                        </p>
                      </div>
                      <div className="post-footer">
                        <button className="relevant-doubts-btn">
                          <img src={relevantButton} alt="like" />{" "}
                          <span>Relevante</span>
                        </button>

                        <p id="see-more" onClick={() => handlePostClick(data)}>
                          Detalhes
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
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
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title="Brasil."
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <div id="landing_footer">
        <FooterLinks />
      </div>
    </>
  )
}
