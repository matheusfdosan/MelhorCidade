import "./styles.css"

import redMarker from "../../assets/red-marker.svg"
import relevantButton from "../../assets/like-icon.svg"
import deleteIcon from "../../assets/trash-icon.svg"

import { useEffect, useState } from "react"

import ReadReportModal from "../ReadReportModal"

import getPosts from "../../utils/getPosts"
import deletePost from "../../utils/deletePost"
import validateService from "../../utils/validateService"

export default function Posts({ turn, setHasMore }) {
  const [postsData, setPostsData] = useState([])
  const [showPostDetailsModal, setShowPostDetailsModal] = useState(false)
  const [specificPost, setSpecificPost] = useState()
  const [adminMode, setAdminMode] = useState(false)

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

    if (document.location.href.includes("/dashboard")) {
      setAdminMode(true)
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
    } else if (
      e.target.className == "delete-btn" ||
      e.target.className == "delete-img"
    ) {
    } else {
      setSpecificPost(data)
      setShowPostDetailsModal(true)
    }
  }

  const handleDeletePostClick = async (id) => {
    const cookieAndId = localStorage.getItem("CookieId")
    const userCookie = JSON.parse(cookieAndId).cookie
    const userId = JSON.parse(cookieAndId).id

    const deleteThePost = { CodigoDenuncia: id, cookie: userCookie, _idUser: userId }
    const response = await deletePost(deleteThePost)
    console.log(response)
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

                  {adminMode && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDeletePostClick(data.CodigoDenuncia)}
                    >
                      <img
                        src={deleteIcon}
                        alt="delete-icon"
                        className="delete-img"
                      />
                    </button>
                  )}
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
