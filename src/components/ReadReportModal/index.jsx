import "./styles.css"
import crossIcon from "../../assets/cross-icon.svg"
import redMarker from "../../assets/red-marker.svg"
import thumbUpIcon from "../../assets/thumb-up-icon.svg"

export default function ReadReportModal({
  specificPostData: data,
  setShowPostDetailsModal,
}) {
  const handleCloseModal = () => {
    setShowPostDetailsModal(false)
  }

  return (
    <>
      <div id="post-modal-overlay">
        <div id="post-container">
          <div id="post-header">
            <h1>{data.title}</h1>
            <button id="close-modal" onClick={handleCloseModal}>
              <img src={crossIcon} alt="cross-icon" />
            </button>
          </div>
          <div id="post-main">
            <img src={data.image} alt={"Imagem: " + data.title} />
            <div id="local-date">
              <div id="locale">
                <img src={redMarker} alt="red-marker" />
                <p>{data.location.address}</p>
              </div>
              <p id="date">{data.date}</p>
            </div>

            <p id="post-desc">{data.description}</p>

            <div id="relevance">
              <button id="relevance-points-btn">
                <img src={thumbUpIcon} alt="thumb-up" />
                <span>Essa denúncia é relevante?</span>
              </button>

              <p id="relevance-points">
                {data.relevance_points} Pessoas acharam essa denúncia relevante
              </p>
            </div>

            <div id="solution">
              <h2>O que pode ser feito?</h2>
              <p>{data.solution}</p>
            </div>

            <div id="comments">
              <h2>Comentários:</h2>

              <ul></ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
