import "./styles.css"
import crossIcon from "../../assets/cross-icon.svg"
import redMarker from "../../assets/red-marker.svg"
import thumbUpIcon from "../../assets/thumb-up-icon.svg"
import reloadPost from "../../utils/reloadPost"
import Loading from "../../components/Loading"
import { useState } from "react"
import commentService from "../../utils/makeCommentService"

export default function ReadReportModal({
  specificPostData: data,
  setShowPostDetailsModal,
}) {
  const [allComments, setAllComments] = useState(data.comentarios)
  const [commentData, setCommentData] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCloseModal = () => {
    setShowPostDetailsModal(false)
  }

  const handleClickOutOfModal = (e) => {
    if (e.target.id === "post-modal-overlay") {
      setShowPostDetailsModal(false)
    }
  }

  const fixData = (dataIso) => {
    const date = new Date(dataIso)

    const day = String(date.getUTCDate()).padStart(2, "0")
    const month = String(date.getUTCMonth() + 1).padStart(2, "0")
    const year = date.getUTCFullYear()

    const formatedDate = `${day}/${month}/${year}`
    return formatedDate
  }

  const handleChangeComment = (e) => {
    setCommentData(e.target.value)
  }

  const handleSubmitComment = async (commentary, idComplaint) => {
    try {
      const cookieAndId = localStorage.getItem("CookieId")
      const cookie = JSON.parse(cookieAndId).cookie
      const id = JSON.parse(cookieAndId).id
      setLoading(true)

      const comment = {
        conteudo: commentary,
        CodigoDenuncia: idComplaint,
        cookie: cookie,
        _idUser: id,
      }

      await commentService(comment)

      const reloadData = {
        CodigoDenuncia: data.CodigoDenuncia,
        cookie: cookie,
        _idUser: id,
      }

      const response = await reloadPost(reloadData)
      setAllComments(response.data.mensagem.comentarios)

      setCommentData("")
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error("Erro ao enviar comentário ou recarregar:", err)
    }
  }

  return (
    <>
      <div id={"post-modal-overlay"} onClick={handleClickOutOfModal}>
        <div id="post-container">
          <div id="post-header">
            <h1>{data.Descricao.Nome}</h1>
            <button id="close-modal" onClick={handleCloseModal}>
              <img src={crossIcon} alt="cross-icon" />
            </button>
          </div>
          <div id="post-main">
            <img
              src={data.Descricao.Imagens[0].Caminho}
              alt={"Imagem: " + data.Descricao.Ocorrencia}
            />
            <div id="local-date">
              <div id="locale">
                <img src={redMarker} alt="red-marker" />
                <p>{data.Descricao.Endereco}</p>
              </div>
              <p id="date">{fixData(data.createdAt)}</p>
            </div>

            <h2>Descrição da denúncia:</h2>
            <p id="post-desc">{data.Descricao.Ocorrencia}</p>

            <div id="relevance">
              <button id="relevance-points-btn">
                <img src={thumbUpIcon} alt="thumb-up" />
                <span>Essa denúncia é relevante?</span>
              </button>

              <p id="relevance-points">
                {data.Validacoes.length} Pessoas acharam essa denúncia relevante
              </p>
            </div>

            {/* <div id="solution">
              <h2>O que pode ser feito?</h2>
              <p>{data.solution}</p>
            </div> */}

            <div id="comments">
              <h2>Comentários:</h2>

              <label htmlFor="add_a_comment">Adicione um comentário</label>
              <div id="add_your_comment">
                <input
                  id="add_a_comment"
                  name="add_a_comment"
                  placeholder="Seu comentário..."
                  onChange={handleChangeComment}
                  value={commentData}
                />
                <button
                  onClick={() =>
                    handleSubmitComment(commentData, data.CodigoDenuncia)
                  }
                >
                  Comentar
                </button>
              </div>

              {loading && <Loading />}

              <ul>
                {allComments.lenght == 0 ? (
                  <li>Nenhum comentário aqui!</li>
                ) : (
                  allComments.map((comment) => {
                    return (
                      <li key={comment._idComentario}>
                        <h3>{comment.nome}: </h3>
                        <p>{comment.conteudo}</p>
                      </li>
                    )
                  })
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
