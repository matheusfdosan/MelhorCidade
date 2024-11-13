import "./styles.css"
import crossIcon from "../../assets/cross-icon.svg"
import redMarker from "../../assets/red-marker.svg"
import thumbUpIcon from "../../assets/thumb-up-icon.svg"
import Input from "../../components/Input"

export default function ReadReportModal({
  specificPostData: data,
  setShowPostDetailsModal,
}) {
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

  return (
    <>
      <div id="post-modal-overlay" onClick={handleClickOutOfModal}>
        <div id="post-container">
          <div id="post-header">
            <h1>{data.Descricao.Ocorrencia}</h1>
            <button id="close-modal" onClick={handleCloseModal}>
              <img src={crossIcon} alt="cross-icon" />
            </button>
          </div>
          <div id="post-main">
            <img src={data.Descricao.Imagens[0].Caminho} alt={"Imagem: " + data.Descricao.Ocorrencia} />
            <div id="local-date">
              <div id="locale">
                <img src={redMarker} alt="red-marker" />
                <p>{data.Descricao.Endereco}</p>
              </div>
              <p id="date">{fixData(data.createdAt)}</p>
            </div>

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
                  <Input idName={"add_a_comment"} placeholder={"Seu comentário..."} />
                  <button>Comentar</button>
                </div>

              {/* <ul>
                {data.comentarios.map((comment) => {
                  return (
                    <li key={comment.id}>
                      <h3>{comment.username}: </h3>
                      <p>{comment.body}</p>
                    </li>
                  )
                })}
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
