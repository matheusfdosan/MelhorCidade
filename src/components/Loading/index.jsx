import "./styles.css"
import loadingGif from "../../assets/loading-gif.gif"

export default function Loading() {
  return (
    <div id="loading">
      <img src={loadingGif} alt="loading" id="loading-gif" />

      <p>
        Carregando...
      </p>
    </div>
  )
}
