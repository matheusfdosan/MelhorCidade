import React, { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import markerIcon from "../../assets/red-marker.svg"
import { Link } from "react-router-dom"

import bottomArrowIcon from "../../assets/bottom-arrow-icon.svg"
import topArrowIcon from "../../assets/top-arrow-icon.svg"

import rightArrowIcon from "../../assets/right-arrow-icon.svg"
import leftArrowIcon from "../../assets/left-arrow-icon.svg"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "./styles.css"

export default function Map() {
  const [barVisibility, setBarVisibility] = useState(true)

  const handleClickMinimize = () => {
    setBarVisibility(!barVisibility)
    console.log(barVisibility)
  }

  const position = [-23.6865, -46.6234]

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  return (
    <div id="map_screen">
      <Header />
      <main id="map_container">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          minZoom={8}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}>
            <Popup>
              <p>Veja esse problema</p>
            </Popup>
          </Marker>
        </MapContainer>

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
                  src={barVisibility ? leftArrowIcon : rightArrowIcon}
                  alt="minimize-icon"
                />
              </button>
            </div>

            <div id="complaints_container_bar">
              <ul>
                <li>
                  <Link>
                    <img src={markerIcon} alt="marker-icon" />
                    <p>
                      Essas guerras de arminhas de gel estão preocupando
                      moradores da região. Muitas crianças estão brincando desse
                      negócio está metendo o apavoro em todo mundo!{" "}
                    </p>
                  </Link>
                </li>
                <li>
                  <Link>
                    <img src={markerIcon} alt="marker-icon" />
                    <p>
                      Cheiro absurdo de maconha na região. Essa gente não tem
                      respeito pelas pessoas, ficam F1 em qualquer lugar, e a
                      gente tem que aguentar esse cheiro maldito!
                    </p>
                  </Link>
                </li>
                <li>
                  <Link>
                    <img src={markerIcon} alt="marker-icon" />
                    <p>
                      Música muito alta! Baile funk rolando solto aqui na
                      comunidade desde às 23:00. Eu querendo durmir, tenho que
                      trampar amanhã e essa gentalha na curtição.
                    </p>
                  </Link>
                </li>
                <li>
                  <Link>
                    <img src={markerIcon} alt="marker-icon" />
                    <p>
                      Música muito alta! Baile funk rolando solto aqui na
                      comunidade desde às 23:00. Eu querendo durmir, tenho que
                      trampar amanhã e essa gentalha na curtição.
                    </p>
                  </Link>
                </li>
                <li>
                  <Link>
                    <img src={markerIcon} alt="marker-icon" />
                    <p>
                      Música muito alta! Baile funk rolando solto aqui na
                      comunidade desde às 23:00. Eu querendo durmir, tenho que
                      trampar amanhã e essa gentalha na curtição.
                    </p>
                  </Link>
                </li>
                <li>
                  <Link>
                    <img src={markerIcon} alt="marker-icon" />
                    <p>
                      Música muito alta! Baile funk rolando solto aqui na
                      comunidade desde às 23:00. Eu querendo durmir, tenho que
                      trampar amanhã e essa gentalha na curtição.
                    </p>
                  </Link>
                </li>
                <li>
                  <Link>
                    <img src={markerIcon} alt="marker-icon" />
                    <p>
                      Música muito alta! Baile funk rolando solto aqui na
                      comunidade desde às 23:00. Eu querendo durmir, tenho que
                      trampar amanhã e essa gentalha na curtição.
                    </p>
                  </Link>
                </li>
                <li>
                  <Link>
                    <img src={markerIcon} alt="marker-icon" />
                    <p>
                      Música muito alta! Baile funk rolando solto aqui na
                      comunidade desde às 23:00. Eu querendo durmir, tenho que
                      trampar amanhã e essa gentalha na curtição.
                    </p>
                  </Link>
                </li>
                <li>
                  <Link>
                    <img src={markerIcon} alt="marker-icon" />
                    <p>
                      Música muito alta! Baile funk rolando solto aqui na
                      comunidade desde às 23:00. Eu querendo durmir, tenho que
                      trampar amanhã e essa gentalha na curtição.
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer target={2} />
    </div>
  )
}