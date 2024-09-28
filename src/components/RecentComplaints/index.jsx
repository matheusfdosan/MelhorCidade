import { Link } from "react-router-dom"
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
          <Link className="complaint">
            <img
              src={
                "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3030949:1610126820/lixo.jpg?f=default&$p$f=07bc60e"
              }
              alt="bus"
            />
            <p>
              O caminhão de lixo parou de passar a semanas, e o lixo está acumulando em um só lugar.
            </p>
          </Link>
          <Link className="complaint">
            <img
              src={
                "https://jpimg.com.br/uploads/2023/02/avenida-23-de-maio-buraco-sao-paulo-sos-sao-paulo-750x450.jpg"
              }
              alt="bus"
            />
            <p>
              Tem um buraco gigante na estrada. Existe a muito tempo e ninguém veio reclamar disso.
            </p>
          </Link>
          <Link className="complaint">
            <img
              src={
                "https://polijunior.com.br/wp-content/webp-express/webp-images/uploads/2020/04/rachadura-na-parede.jpg.webp"
              }
              alt="bus"
            />
            <p>
              Depois da obra aqui do lado, a minha casa começou a aparecer rachaduras grandes. 
            </p>
          </Link>
        </div>
      </div>
    </>
  )
}
