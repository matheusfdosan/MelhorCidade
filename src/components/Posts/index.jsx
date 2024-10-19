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
        const data = await getPosts()
        setPostsData(data)
      } catch (error) {
        console.log("Failed to fetch posts:" + error)
      }
    }

    loadPostsData()
  }, [])

  const handlePostClick = (id) => {
    setSpecificPost(id)
    setShowPostDetailsModal(true)
  }

  return (
    <>
      <div id="posts">
        {postsData.map((data) => {
          return (
            <div className="post" key={data.id}>
              <img
                src={data.image}
                alt={"Imagem: " + data.title}
                title={"Imagem: " + data.title}
              />
              <div className="post-content">
                <div className="post-header">
                  <div className="locale">
                    <img src={redMarker} alt="red-marker" />
                    <p>{data.location.address}</p>
                  </div>
                  <p className="date">{data.date}</p>
                </div>
                <div className="post-body">
                  <p>
                    <strong>{data.owner}:</strong> {data.description}
                  </p>
                </div>
                <div className="post-footer">
                  <button className="relevant-doubts-btn">
                    <img src={relevantButton} alt="like" />{" "}
                    <span>Relevante</span>
                  </button>

                  <p id="see-more" onClick={() => handlePostClick(data.id)}>
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
          specificPostData={postsData[specificPost]}
          setShowPostDetailsModal={setShowPostDetailsModal}
        />
      )}
    </>
  )
}
