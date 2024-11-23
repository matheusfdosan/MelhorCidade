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
import updateStatus from "../../utils/updateStatus"
import Input from "../../components/Input"

export default function ReadReportModal({
  specificPostData: data,
  setShowPostDetailsModal,
}) {
  const [allComments, setAllComments] = useState(data.comentarios)
  const [allValidation, setAllValidation] = useState(data.Validacoes)
  const [commentData, setCommentData] = useState("")
  const [loading, setLoading] = useState(false)
  const [validate, setValidate] = useState("no-validated")
  const [changeState, setChangeState] = useState(false)
  const [statusInput, setStatusInput] = useState(data.StatusDenuncia)

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

  useEffect(() => {
    if (document.location.href.includes("/dashboard")) {
      setChangeState(true)
    } else {
      setChangeState(false)
    }
  }, [])

  const handleCloseModal = () => {
    setShowPostDetailsModal(false)

    if (document.location.href.includes("/dashboard")) {
      window.location.reload()
    }
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

  const handleChangeStatus = (e) => {
    setStatusInput(e.target.value)
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

  const handleClickStatusButton = async () => {
    try {
      setLoading(true)
      const cookieAndId = localStorage.getItem("CookieId")
      const userCookie = JSON.parse(cookieAndId).cookie
      const userId = JSON.parse(cookieAndId).id

      const request = {
        cookie: userCookie,
        _idUser: userId,
        mudancas: statusInput,
        CodigoDenuncia: data.CodigoDenuncia,
      }

      const response = await updateStatus(request)
      console.log("Resposta ao atualizar status:", response)
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
        console.log("Algo deu errado nos status: " + data.CodigoDenuncia)
        setLoading(false)
      }
    } catch (err) {
      console.error("Erro ao atualizar status:", err)
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

            {changeState && (
              <div id="status_container">
                <h2>Mudar status da denúncia: </h2>
                <span id="select">
                  <select
                    name="changeStatus"
                    id="status-select"
                    value={statusInput}
                    onChange={handleChangeStatus}
                  >
                    <option value="Em aberto">Em aberto</option>
                    <option value="Resolvido">Resolvido</option>
                  </select>
                  <button onClick={handleClickStatusButton} id="update">
                    Atualizar
                  </button>
                </span>
              </div>
            )}

            {data.CodigoDenuncia == "bd8ab3c6-2fdd-4a93-abab-b71095b2463f" && <div id="solution">
              <h2>O que pode ser feito?</h2>
              <p>Agradecemos pela sua denúncia. Informamos que a obra na estrada do Alvarenga foi concluída e o trânsito normalizado. Seguimos as diretrizes do <strong>Art. 31 da Constituição Federal</strong>, que garante o direito à gestão participativa, e comunicamos diretamente com a <strong>Secretaria Municipal de Infraestrutura Urbana</strong>, responsável pela execução. Utilizamos os canais oficiais da Prefeitura e acompanhamos o cronograma via <strong>Portal de Obras Públicas</strong>. Seguimos à disposição para novas solicitações.</p>
            </div>}

            {data.CodigoDenuncia == "0af3e0a2-c6ca-4da6-a461-805231eef2c3" && <div id="solution">
              <h2>O que pode ser feito?</h2>
              <p>Agradecemos pela sua denúncia. Nesse caso, recomendamos que você entre em contato imediatamente com a <strong>Prefeitura</strong>, por meio da <strong>Secretaria Municipal de Fiscalização</strong>, para relatar a obstrução. Além disso, é possível acionar o Corpo de <strong>Bombeiros pelo número 193</strong>, pois a obstrução de uma saída de emergência coloca vidas em risco, o que é uma infração grave conforme o <strong>Código de Defesa Civil</strong> e pode gerar penalidades ao responsável. Se necessário, registre um boletim de ocorrência na delegacia local para formalizar o problema. A colaboração de cidadãos é essencial para a segurança de todos.</p>
            </div>}

            {changeState && <div id="canMake">
              <h2>O que pode ser feito?</h2>
              <Input placeholder={"O que pode ser feito?"} />
              <button>Enviar</button>
            </div>}

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
