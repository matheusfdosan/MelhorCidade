import "./styles.css"
import redMarker from "../../assets/red-marker.svg"
import relevantButton from "../../assets/like-icon.svg"
import getPosts from "../../utils/getPosts"
import validateService from "../../utils/validateService"
import ReadReportModal from "../ReadReportModal"
import { useEffect, useState } from "react"

export default function Posts({ turn ,setHasMore }) {
  const [postsData, setPostsData] = useState([]);
  const [showPostDetailsModal, setShowPostDetailsModal] = useState(false);
  const [specificPost, setSpecificPost] = useState();

  useEffect(() => {
    const loadPostsData = async () => {
      try {
        const cookieAndId = localStorage.getItem("CookieId")
        const cookie = JSON.parse(cookieAndId).cookie
        const id = JSON.parse(cookieAndId).id

        const data = await getPosts(cookie, id, turn)

        setPostsData((prevPosts) => {
          const existingIds = prevPosts.map((post) => post.CodigoDenuncia)
          const newPosts = data.denuncias.filter(
            (post) => !existingIds.includes(post.CodigoDenuncia)
          )
          return [...prevPosts, ...newPosts]
        })

        setHasMore(data.denuncias.length >= 15)
      } catch (error) {
        console.log("Failed to fetch posts: " + error)
        setHasMore(false)
      }
    }

    loadPostsData()
  }, [turn, setHasMore])

  const handlePostClick = (e, data) => {
    if (
      e.target.className == "relevant-span" ||
      e.target.className == "relevant-icon" ||
      e.target.className == "relevant-doubts-btn"
    ) {
      const cookieAndId = localStorage.getItem("CookieId")
      const cookie = JSON.parse(cookieAndId).cookie
      const id = JSON.parse(cookieAndId).id

      const validate = {
        CodigoDenuncia: data.CodigoDenuncia,
        cookie: cookie,
        _idUser: id,
      }

      const response = validateService(validate)
      if (response.acess) {
        console.log(e.target + "oi")
      }
    } else {
      setSpecificPost(data)
      setShowPostDetailsModal(true)
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
      <div id="posts">
        {postsData.map((data) => {
          return (
            <div
              className="post"
              key={data.CodigoDenuncia}
              id={data.CodigoDenuncia}
              onClick={(e) => handlePostClick(e, data)}
            >
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
                    <strong>{data.Descricao.Nome}:</strong>{" "}
                    {data.Descricao.Ocorrencia}
                  </p>
                </div>
                <div className="post-footer">
                  <button className="relevant-doubts-btn">
                    <img
                      src={relevantButton}
                      alt="like"
                      className="relevant-icon"
                    />{" "}
                    <span className="relevant-span">Relevante</span>
                  </button>
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
