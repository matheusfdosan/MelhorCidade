import "./styles.css";

import redMarker from "../../assets/red-marker.svg";
import relevantButton from "../../assets/like-icon.svg";
import deleteIcon from "../../assets/trash-icon.svg";

import { useEffect, useState } from "react";

import ReadReportModal from "../ReadReportModal";

import getPosts from "../../utils/getPosts";
import deletePost from "../../utils/deletePost";
import validateService from "../../utils/validateService";
import Loading from "../Loading";

export default function Posts({ turn, setHasMore }) {
  const [postsData, setPostsData] = useState([]);
  const [showPostDetailsModal, setShowPostDetailsModal] = useState(false);
  const [specificPost, setSpecificPost] = useState();
  const [adminMode, setAdminMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const openDeleteConfirmation = (id) => {
    setPostToDelete(id);
    setShowConfirmationModal(true);
  };

  const confirmDeletePost = async () => {
    setShowConfirmationModal(false);
    if (postToDelete) {
      await handleDeletePostClick(postToDelete);
      setPostToDelete(null);
    }
  };

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
    );
  };

  useEffect(() => {
    const loadPostsData = async () => {
      try {
        const cookieAndId = localStorage.getItem("CookieId");
        const { cookie, id } = JSON.parse(cookieAndId);

        const data = await getPosts(cookie, id, turn);

        setPostsData((prevPosts) => {
          const existingIds = prevPosts.map((post) => post.CodigoDenuncia);
          const newPosts = data.denuncias.filter(
            (post) => !existingIds.includes(post.CodigoDenuncia)
          );
          return [...prevPosts, ...newPosts];
        });

        setHasMore(data.denuncias.length >= 15);
      } catch (error) {
        console.log("Failed to fetch posts: " + error);
        setHasMore(false);
      }
    };

    if (document.location.href.includes("/dashboard")) {
      setAdminMode(true);
    }

    loadPostsData();
  }, [turn, setHasMore]);

  const handlePostClick = (e, data) => {
    if (
      ["relevant-span", "relevant-icon", "relevant-doubts-btn"].includes(
        e.target.className
      )
    ) {
      const cookieAndId = localStorage.getItem("CookieId");
      const { cookie, id } = JSON.parse(cookieAndId);

      const validate = {
        CodigoDenuncia: data.CodigoDenuncia,
        cookie,
        _idUser: id,
      };

      const response = validateService(validate);
      if (response.acess) {
        console.log(e.target + "oi");
      }
    } else if (
      e.target.className === "delete-btn" ||
      e.target.className === "delete-img"
    ) {
      // Ignora clique direto no botão deletar
    } else {
      setSpecificPost(data);
      setShowPostDetailsModal(true);
    }
  };

  const handleDeletePostClick = async (id) => {
    setLoading(true);

    const cookieAndId = localStorage.getItem("CookieId");
    const { cookie, id: userId } = JSON.parse(cookieAndId);

    const deleteThePost = {
      CodigoDenuncia: id,
      cookie,
      _idUser: userId,
    };

    const response = await deletePost(deleteThePost);

    setLoading(false);

    if (response.acess) {
      setPostsData((prevPosts) =>
        prevPosts.filter((post) => post.CodigoDenuncia !== id)
      );
    } else {
      document.location.href = "/login";
    }
  };

  const fixData = (dataIso) => {
    const date = new Date(dataIso);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

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
  );
}
