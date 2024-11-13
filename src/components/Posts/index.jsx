import "./styles.css"
import redMarker from "../../assets/red-marker.svg"
import relevantButton from "../../assets/like-icon.svg"
import getPosts from "../../utils/getPosts"
import ReadReportModal from "../ReadReportModal"
import { useEffect, useState } from "react"

export default function Posts() {
  const [postsData, setPostsData] = useState([])
  const [showPostDetailsModal, setShowPostDetailsModal] = useState(false)
  const [specificPost, setSpecificPost] = useState()

  useEffect(() => {
    const loadPostsData = async () => {
      try {
        const cookieAndId = localStorage.getItem("CookieId")
        const cookie = JSON.parse(cookieAndId).cookie
        const id = JSON.parse(cookieAndId).id

        const data = await getPosts(cookie, id)
        setPostsData(data.denuncias)
      } catch (error) {
        console.log("Failed to fetch posts:" + error)
      }
    }

    loadPostsData()
  }, [])

  const handlePostClick = (data) => {
    setSpecificPost(data)
    setShowPostDetailsModal(true)
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
      <div id="posts">
        {postsData.map((data) => {
          return (
            <div className="post" key={data.CodigoDenuncia}>
              <img
                src={data.Descricao.Imagens[0].Caminho}
                alt={"Imagem: " + data.Descricao.Imagens[0]._id}
                title={"Imagem: "}
              />
              <div className="post-content">
                <div className="post-header">
                  <div className="locale">
                    <img src={redMarker} alt="red-marker" />
                    <p>{data.Descricao.Endereco}</p>
                  </div>
                  <p className="date">{fixData(data.createdAt)}</p>
                </div>
                <div className="post-body">
                  <p>
                    <strong>{data.Descricao.Nome}:</strong> {data.Descricao.Ocorrencia}
                  </p>
                </div>
                <div className="post-footer">
                  <button className="relevant-doubts-btn">
                    <img src={relevantButton} alt="like" />{" "}
                    <span>Relevante</span>
                  </button>

                  <p
                    id="see-more"
                    onClick={() => handlePostClick(data)}
                  >
                    Detalhes
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {showPostDetailsModal && (
        <ReadReportModal
          specificPostData={specificPost}
          setShowPostDetailsModal={setShowPostDetailsModal}
        />
      )}
    </>
  )
}
