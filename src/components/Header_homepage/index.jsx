import "./styles.css"
import appsIcon from "../../assets/apps-icon.svg"

export default function Header_homepage() {
  return (
    <header id="header_homepage">
      <div id="header_container">
        <h1>Página Inicial</h1>

        <button>
          <img src={appsIcon} alt="apps-button" />
        </button>
      </div>
    </header>
  )
}
