import "./styles.css"

import redMarker from "../../assets/red-marker.svg"
import deleteIcon from "../../assets/trash-icon.svg"

import { useEffect, useState } from "react"

import ReadReportModal from "../ReadReportModal"

import deletePost from "../../utils/deletePost"
import Loading from "../Loading"
import loadPostFiltered from "../../utils/loadPostFiltered"
import reloadPost from "../../utils/reloadPost"

export default function Posts({ turn, setHasMore, filterPosts }) {
  const [postsData, setPostsData] = useState([])
  const [showPostDetailsModal, setShowPostDetailsModal] = useState(false)
  const [specificPost, setSpecificPost] = useState()
  const [adminMode, setAdminMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)

  const openDeleteConfirmation = (id) => {
    setPostToDelete(id)
    setShowConfirmationModal(true)
  }

  const confirmDeletePost = async () => {
    setShowConfirmationModal(false)
    if (postToDelete) {
      await handleDeletePostClick(postToDelete)
      setPostToDelete(null)
    }
  }

  const ConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <p>Tem certeza de que deseja apagar esta postagem?</p>
          <div className="modal-buttons">
            <button className="confirm-btn" onClick={onConfirm}>
              Sim
            </button>
            <button className="cancel-btn" onClick={onCancel}>
              Não
            </button>
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    const loadPostsData = async () => {
      try {
        setLoading(true)
        const cookieAndId = localStorage.getItem("CookieId")
        const { cookie, id } = JSON.parse(cookieAndId)

        const request = {
          cookie,
          _idUser: id,
          turn,
          filtro: filterPosts,
        }

        const data = await loadPostFiltered(request)

        setPostsData(data.denuncias)

        setHasMore(data.denuncias.length >= 15)
      } catch (error) {
        console.log("Failed to fetch posts: " + error)
        setHasMore(false)
      } finally {
        setLoading(false)
      }
    }

    setPostsData([])
    loadPostsData()
  }, [turn, filterPosts, setHasMore])

  const handlePostClick = async (e, data) => {
    if (
      e.target.className === "delete-btn" ||
      e.target.className === "delete-img"
    ) {
    } else {
      try {
        setLoading(true)
        const cookieAndId = localStorage.getItem("CookieId")
        const { cookie, id } = JSON.parse(cookieAndId)

        const reloadData = {
          CodigoDenuncia: data.CodigoDenuncia,
          cookie: cookie,
          _idUser: id,
        }

        const response = await reloadPost(reloadData)

        console.log(response.data.mensagem)
        setSpecificPost(response.data.mensagem)
        setShowPostDetailsModal(true)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log("Erro ao pegar dados da postagem: " + err)
      }
    }
  }

  const handleDeletePostClick = async (id) => {
    setLoading(true)

    const cookieAndId = localStorage.getItem("CookieId")
    const { cookie, id: userId } = JSON.parse(cookieAndId)

    const deleteThePost = {
      CodigoDenuncia: id,
      cookie,
      _idUser: userId,
    }

    const response = await deletePost(deleteThePost)

    setLoading(false)

    if (response.acess) {
      setPostsData((prevPosts) =>
        prevPosts.filter((post) => post.CodigoDenuncia !== id)
      )
    } else {
      document.location.href = "/login"
    }
  }

  const fixData = (dataIso) => {
    const date = new Date(dataIso)
    const day = String(date.getUTCDate()).padStart(2, "0")
    const month = String(date.getUTCMonth() + 1).padStart(2, "0")
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <>
      <div id="posts">
        {postsData.map((data) => (
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
                <span
                  id="status"
                  className={
                    data.StatusDenuncia == "Em aberto" ? "open" : "close"
                  }
                >
                  {data.StatusDenuncia}
                </span>

                {adminMode && (
                  <button
                    className="delete-btn"
                    onClick={() => openDeleteConfirmation(data.CodigoDenuncia)}
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
        ))}
      </div>

      {loading && <Loading />}

      {showConfirmationModal && (
        <ConfirmationModal
          onConfirm={confirmDeletePost}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}

      {showPostDetailsModal && (
        <ReadReportModal
          specificPostData={specificPost}
          setShowPostDetailsModal={setShowPostDetailsModal}
        />
      )}
    </>
  )
}
