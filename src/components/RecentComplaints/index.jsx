import { Link } from "react-router-dom"
// import busão from ""
// import transito from ""
// import esgoto from ""
import "./styles.css"

export default function RecentComplaints() {
  return (
    <>
      <div id="recent_complaints">
        <div id="header_recent_complaints">
          <h2>Denúncias Recentes</h2>
          <Link to={""}>Ver mais</Link>
        </div>

        <div id="complaints">
          <Link className="complaint">
            <img
              src="https://2015.onibus.org/6/29/p/4afb1f19cbd1aa951f35d5e9393bc41b.jpg"
              alt="bus"
            />
            <p>O ônibus do Jardim Selma não passa! Demora muito!</p>
          </Link>
          <Link className="complaint">
            <img
              src={
                "https://www.transportabrasil.com.br/wp-content/uploads/2012/11/transito-dest.jpg"
              }
              alt="bus"
            />
            <p>
              Muito trânsito no Alvarenga. Todos os dias enfretando o mesmo
              problema!
            </p>
          </Link>
          <Link className="complaint">
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc6yHoRzmHz2ZWCM5k5a1vK110FfG3Mq8LUw&s"
              }
              alt="bus"
            />
            <p>
              Cheiro muito ruim de esgoto no meio da rua! Cadê o prefeito para
              consertar isso!!! 😡
            </p>
          </Link>
        </div>
      </div>
    </>
  )
}
