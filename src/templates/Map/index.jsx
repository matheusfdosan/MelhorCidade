import React, { useState, useEffect } from "react"
import markerIcon from "../../assets/red-marker.svg"
import { Link } from "react-router-dom"

import bottomArrowIcon from "../../assets/bottom-arrow-icon.svg"
import topArrowIcon from "../../assets/top-arrow-icon.svg"

import seeReportsIcon from "../../assets/report-icon.svg"
import leftArrowIcon from "../../assets/left-arrow-icon.svg"

import Header from "../../components/Header"
import Footer from "../../components/Footer"

import "./styles.css"

import TheMap from "../../components/TheMap"
import getPosts from "../../utils/getPosts.js"

export default function Map() {
  const [barVisibility, setBarVisibility] = useState(false)
  const [locationData, setLocationData] = useState([])
  const [centerMap, setCenterMap] = useState([-23.68524, -46.620502])

  useEffect(() => {
    document.title = "Melhor Cidade - Mapa de Denúncias"
    
    const loadLocationData = async () => {
      try {
        const data = await getPosts()
        setLocationData(data)
      } catch (error) {
        console.log("Failed to fetch locals:" + error)
      }
    }

    loadLocationData()
  }, [])

  const handleClickLocalItem = (local) => {
    setCenterMap(local)
  }

  const handleClickMinimize = () => {
    setBarVisibility(!barVisibility)
  }

  return (
    <div id="map_screen">
      <Header />
      <main id="map_container">
        <div id="the_map_container">
          <TheMap centerProp={centerMap} />
        </div>

        <div
          className={`complaints_bar ${barVisibility ? "active" : "minimized"}`}
        >
          <div className="container">
            <div id="header_complaints_bar">
              <h2>Problemas</h2>
              <button id="minimize_btn" onClick={handleClickMinimize}>
                <img
                  src={barVisibility ? bottomArrowIcon : topArrowIcon}
                  alt="minimize-icon"
                />
              </button>
              <button id="minimize_btn_right" onClick={handleClickMinimize}>
                <img
                  src={barVisibility ? leftArrowIcon : seeReportsIcon}
                  alt="minimize-icon"
                />
              </button>
            </div>

            <div id="complaints_container_bar">
              <ul>
                {locationData.map((data) => (
                  <li
                    key={data.id}
                    onClick={() =>
                      handleClickLocalItem([
                        data.location.position.lat,
                        data.location.position.long,
                      ])
                    }
                  >
                    <Link>
                      <img src={markerIcon} alt="marker-icon" />
                      <p>{data.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer target={2} />
    </div>
  )
}
