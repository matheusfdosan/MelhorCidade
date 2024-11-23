import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import markerIcon from "../../assets/red-marker.svg"
import "./styles.css"

import Header from "../../components/Header"
import Footer from "../../components/Footer"

import TheMap from "../../components/TheMap"
import getPosts from "../../utils/getPosts.js"

export default function Map() {
  const [locationData, setLocationData] = useState([])
  const [centerMap, setCenterMap] = useState([-23.68524, -46.620502])
  const [zoom, setZoom] = useState(12)

  useEffect(() => {
    const cookie = localStorage.getItem("CookieId")
    if (!cookie) {
      document.location.href = "/login"
    } else {
      document.title = "Melhor Cidade - Mapa de Denúncias"

      const getUserLocation = async () => {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          })
          const { latitude, longitude } = position.coords
          setCenterMap([latitude, longitude])
        } catch (err) {
          console.log("Error to get user coordinates: " + err)
        }
      }
      getUserLocation()

      const loadLocationData = async () => {
        try {
          const cookieAndId = localStorage.getItem("CookieId")
          const { cookie, id } = JSON.parse(cookieAndId)

          const data = await getPosts(cookie, id, 0)
          setLocationData(data.denuncias)
        } catch (error) {
          console.log("Failed to fetch locals:" + error)
        }
      }

      loadLocationData()
    }
  }, [])

  const handleClickLocalItem = (local) => {
    setCenterMap(local)
    setZoom(18)
  }

  return (
    <div id="map_screen">
      <Header />
      <main id="map_container">
        <div id="the_map_container">
          <TheMap centerProp={centerMap} zoomMap={zoom} />
        </div>

        <div className="complaints_bar">
          <div className="container">
            <div id="header_complaints_bar">
              <h2>Problemas</h2>
            </div>

            <div id="complaints_container_bar">
              <ul>
                {locationData.map((data) => (
                  <li
                    key={data.CodigoDenuncia}
                    onClick={() => {
                      handleClickLocalItem([
                        data.CoordenadasOcorrencia.coordinates[0],
                        data.CoordenadasOcorrencia.coordinates[1],
                      ])
                    }}
                  >
                    <Link>
                      <img src={markerIcon} alt="marker-icon" />
                      <p>{data.Descricao.Ocorrencia}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
