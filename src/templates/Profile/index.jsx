import "./styles.css"
import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import FooterLinks from "../../components/FooterLinks"
import loadUsersPosts from "../../utils/loadUsersPosts"
import redMarker from "../../assets/red-marker.svg"
import ReadReportModal from "../../components/ReadReportModal"

export default function Profile() {
  const [postsData, setPostsData] = useState([])
  const [showPostDetailsModal, setShowPostDetailsModal] = useState(false)
  const [specificPost, setSpecificPost] = useState()

  useEffect(() => {
    const cookie = localStorage.getItem("CookieId")
    if (!cookie) {
      document.location.href = "/login"
    } else {
      document.title = "Melhor Cidade - Perfil"

      const loadUserPosts = async () => {
        try {
          const cookieAndId = localStorage.getItem("CookieId")
          const { cookie, id } = JSON.parse(cookieAndId)

          const request = {
            cookie,
            _idUser: id,
            _idUserSee: id,
          }

          const data = await loadUsersPosts(request)
          setPostsData(data.posts || [])
        } catch (error) {
          console.error("Erro ao carregar postagens do usuário:", error)
        }
      }

      loadUserPosts()
    }
  }, [])

  const fixData = (dataIso) => {
    const date = new Date(dataIso)
    const day = String(date.getUTCDate()).padStart(2, "0")
    const month = String(date.getUTCMonth() + 1).padStart(2, "0")
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
  }

  const handlePostClick = async (data) => {
    setSpecificPost(data)
    setShowPostDetailsModal(true)
  }

  return (
    <>
      <Header />
      <main id="profile_container">
        <div id="user_info">
          <div id="user_datas">
            <h2>Suas Postagens</h2>
            <div>
              <span className="amout">{postsData.length}</span>
              <span className="of_something"> Postagens</span>
            </div>
          </div>
        </div>

        <div id="posts">
          {postsData.map((data) => (
            <div
              className="post"
              key={data.CodigoDenuncia}
              id={data.CodigoDenuncia}
              onClick={() => handlePostClick(data)}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showPostDetailsModal && (
        <ReadReportModal
          specificPostData={specificPost}
          setShowPostDetailsModal={setShowPostDetailsModal}
        />
      )}

      <div id="profile_footer">
        <FooterLinks />
      </div>

      <Footer target={3} />
    </>
  )
}
