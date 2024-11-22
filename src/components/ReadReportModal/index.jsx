import "./styles.css"
import "swiper/css"
import "swiper/css/navigation"

import { useEffect, useState } from "react"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import crossIcon from "../../assets/cross-icon.svg"
import redMarker from "../../assets/red-marker.svg"
import thumbUpIcon from "../../assets/thumb-up-icon.svg"
import thumbDownIcon from "../../assets/thumb-down-icon.svg"

import commentService from "../../utils/makeCommentService"
import validateService from "../../utils/validateService"
import reloadPost from "../../utils/reloadPost"

import Loading from "../../components/Loading"

export default function ReadReportModal({
  specificPostData: data,
  setShowPostDetailsModal,
}) {
  const [allComments, setAllComments] = useState(data.comentarios)
  const [allValidation, setAllValidation] = useState(data.Validacoes)
  const [commentData, setCommentData] = useState("")
  const [loading, setLoading] = useState(false)
  const [validate, setValidate] = useState("no-validated")

  useEffect(() => {
    const cookieAndId = localStorage.getItem("CookieId")

    if (cookieAndId) {
      const userId = JSON.parse(cookieAndId).id

      const userValidated = allValidation.some(
        (validation) => validation._Id_Usuario === userId
      )

      setValidate(userValidated ? "validated" : "no-validated")
    }
  }, [allValidation])

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

  const handleRelevantPoint = async () => {
    const cookieAndId = localStorage.getItem("CookieId")
    const userCookie = JSON.parse(cookieAndId).cookie
    const userId = JSON.parse(cookieAndId).id
    setLoading(true)

    const validate = {
      CodigoDenuncia: data.CodigoDenuncia,
      cookie: userCookie,
      _idUser: userId,
    }

    const response = await validateService(validate)
    if (response.acess) {
      const reloadData = {
        CodigoDenuncia: data.CodigoDenuncia,
        cookie: userCookie,
        _idUser: userId,
      }

      const responseReload = await reloadPost(reloadData)
      setAllValidation(responseReload.data.mensagem.Validacoes)

      setLoading(false)
    } else {
      console.log("Algo deu errado na validação: " + data.CodigoDenuncia)
      setLoading(false)
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
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  src={data.Descricao.Imagens[0].Caminho}
                  alt={"Imagem: " + data.Descricao.Imagens[0]._id}
                  title={"Imagem: "}
                />
              </SwiperSlide>

              {data.Descricao.Imagens[1] && (
                <SwiperSlide>
                  <img
                    src={data.Descricao.Imagens[1].Caminho}
                    alt={"Imagem: " + data.Descricao.Imagens[1]._id}
                    title={"Imagem: "}
                  />
                </SwiperSlide>
              )}

              {data.Descricao.Imagens[2] && (
                <SwiperSlide>
                  <img
                    src={data.Descricao.Imagens[2].Caminho}
                    alt={"Imagem: " + data.Descricao.Imagens[2]._id}
                    title={"Imagem: "}
                  />
                </SwiperSlide>
              )}
            </Swiper>
            <div id="local-date">
              <div id="locale">
                <img src={redMarker} alt="red-marker" />
                <p>{data.Descricao.Endereco}</p>
              </div>
              <p id="date">{fixData(data.createdAt)}</p>
            </div>

            <div id="description">
              <h2>Descrição da denúncia:</h2>
              <p id="post-desc">{data.Descricao.Ocorrencia}</p>
            </div>

            <div id="relevance">
              <button
                id="relevance-points-btn"
                onClick={handleRelevantPoint}
                className={validate}
              >
                {validate === "validated" ? (
                  <>
                    <img src={thumbDownIcon} alt="thumb-down" />
                    <span>Retirar ponto de relevância</span>
                  </>
                ) : (
                  <>
                    <img src={thumbUpIcon} alt="thumb-up" />
                    <span>Essa denúncia é relevante?</span>
                  </>
                )}
              </button>

              <p id="relevance-points">
                {allValidation.length} Pessoas acharam essa denúncia relevante
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
