import { Link } from "react-router-dom"
import "./styles.css"
import report from "../../assets/report.svg"
import map from "../../assets/map.svg"
import helpChat from "../../assets/help-chat.svg"
import doubts from "../../assets/doubts.svg"

export default function HowCanHelp() {
  return (
    <>
      <div id="how_can_help">
        <h2>Como podemos te ajudar hoje?</h2>

        <div id="tools">
          <Link className="tool">
            <div className="tool-icon">
              <img src={report} alt="report" />
            </div>
            <div className="tool-description">Denunciar</div>
          </Link>
          <Link className="tool">
            <div className="tool-icon">
              <img src={map} alt="map" />
            </div>
            <div className="tool-description">Ver Mapa</div>
          </Link>
          <Link className="tool">
            <div className="tool-icon"><img src={doubts} alt="doubts" /></div>
            <div className="tool-description">Dúvidas</div>
          </Link>
          <Link className="tool">
            <div className="tool-icon"><img src={helpChat} alt="help-chat" /></div>
            <div className="tool-description">Chat Ajuda</div>
          </Link>
        </div>
      </div>
    </>
  )
}
