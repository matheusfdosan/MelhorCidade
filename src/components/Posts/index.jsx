import "./styles.css"
import redMarker from "../../assets/red-marker.svg"
import relevantButton from "../../assets/like-icon.svg"
import { Link } from "react-router-dom"

export default function Posts() {
  return (
    <>
      <div id="posts">
        <div className="post">
          <img
            src="https://beartac-imgs.s3.sa-east-1.amazonaws.com/uploads/DSC08361-1300x731.jpg"
            alt="post-image"
          />
          <div className="post-content">
            <div className="post-header">
              <div className="locale">
                <img src={redMarker} alt="red-marker" />
                <p>Rua Ernesto Nicoline 109</p>
              </div>
              <p className="date">23/09/2024</p>
            </div>
            <div className="post-body">
              <p>
                <strong>José de Camargo:</strong> Essas guerras de arminhas de
                gel estão preocupando moradores da região. Muitas crianças estão
                brincando desse negócio está metendo o apavoro em todo mundo!
              </p>
            </div>
            <div className="post-footer">
              <button className="relevant-doubts-btn">
                <img src={relevantButton} alt="like" /> <span>Relevante</span>
              </button>
              <Link to={""}>Ver denuncia</Link>
            </div>
          </div>
        </div>

        <div className="post">
          <img
            src="https://assets.b9.com.br/wp-content/uploads/2018/04/71749-1200x720.jpg"
            alt="post-image"
          />
          <div className="post-content">
            <div className="post-header">
              <div className="locale">
                <img src={redMarker} alt="red-marker" />
                <p>Rua do Diadema, 493, Centro de Diadema</p>
              </div>
              <p className="date">11/09/2024</p>
            </div>
            <div className="post-body">
              <p>
                <strong>Zézé de Luciano:</strong> Cheiro absurdo de maconha na
                região. Essa gente não tem respeito pelas pessoas, ficam F1 em
                qualquer lugar, e a gente tem que aguentar esse cheiro maldito!
              </p>
            </div>
            <div className="post-footer">
              <button className="relevant-doubts-btn">
                <img src={relevantButton} alt="like" /> <span>Relevante</span>
              </button>
              <Link to={""}>Ver denuncia</Link>
            </div>
          </div>
        </div>

        <div className="post">
          <img
            src="https://ogimg.infoglobo.com.br/in/4065262-96e-0ed/FT1086A/Gringos-dancam-ate-o-chao-no-baile-funk-do-Emocoes-na-RocinhaFoto-deEduardo-Naddar.jpg"
            alt="post-image"
          />
          <div className="post-content">
            <div className="post-header">
              <div className="locale">
                <img src={redMarker} alt="red-marker" />
                <p>Rua Erlindo de Emanuela 124</p>
              </div>
              <p className="date">22/09/2024</p>
            </div>
            <div className="post-body">
              <p>
                <strong>Viviana Santana:</strong> Música muito alta! Baile funk
                rolando solto aqui na comunidade desde às 23:00. Eu querendo
                durmir, tenho que trampar amanhã e essa gentalha na curtição.
              </p>
            </div>
            <div className="post-footer">
              <button className="relevant-doubts-btn">
                <img src={relevantButton} alt="like" /> <span>Relevante</span>
              </button>
              <Link to={""}>Ver denuncia</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
