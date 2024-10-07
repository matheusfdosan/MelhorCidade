import React, { useState } from "react"
import { useEffect } from "react"
import markerIcon from "../../assets/red-marker.svg"
import { Link } from "react-router-dom"

import bottomArrowIcon from "../../assets/bottom-arrow-icon.svg"
import topArrowIcon from "../../assets/top-arrow-icon.svg"

import rightArrowIcon from "../../assets/right-arrow-icon.svg"
import leftArrowIcon from "../../assets/left-arrow-icon.svg"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "./styles.css"
import TheMap from "../../components/TheMap"

export default function Map() {
  const [barVisibility, setBarVisibility] = useState(false)

  useEffect(() => {
    document.title = "Melhor Cidade - Mapa de Denúncias"
  }, [])

  const handleClickMinimize = () => {
    setBarVisibility(!barVisibility)
  }

  return (
    <div id="map_screen">
      <Header />
      <main id="map_container">
        <div id="the_map_container">
          <TheMap />
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
