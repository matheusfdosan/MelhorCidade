import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import markerIcon from "../../assets/red-marker.svg"
import "./styles.css"

import bottomArrowIcon from "../../assets/bottom-arrow-icon.svg"
import topArrowIcon from "../../assets/top-arrow-icon.svg"

import leftArrowIcon from "../../assets/left-arrow-icon.svg"
import seeReportsIcon from "../../assets/report-icon.svg"

import homeIcon_outlined from "../../assets/home-icon-outlined.svg"
import darkPlusIcon_Outilined from "../../assets/dark-plus-icon-outlined.svg"
import mapIcon_filled from "../../assets/map-icon-filled.svg"
import userIcon_outlined from "../../assets/user-icon-outlined.svg"

import Header from "../../components/Header"

import TheMap from "../../components/TheMap"
import getPosts from "../../utils/getPosts.js"

export default function Map() {
  const [barVisibility, setBarVisibility] = useState(true)
  const [locationData, setLocationData] = useState([])
  const [centerMap, setCenterMap] = useState([-23.68524, -46.620502])

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
          const data = await getPosts()
          setLocationData(data)
        } catch (error) {
          console.log("Failed to fetch locals:" + error)
        }
      }

      loadLocationData()
    }
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

      <footer id="footer_homepage_handmade">
      <div id="footer_container">
        <Link to="/homepage">
          <img
            src={homeIcon_outlined}
            alt="home-button"
          />
        </Link>
        <Link to="/report">
          <img
            src={darkPlusIcon_Outilined}
            alt="report-button"
          />
        </Link>
        <Link to="/map">
          <img
            src={mapIcon_filled}
            alt="profile-button"
          />
        </Link>
        <Link to="/account">
          <img
            src={userIcon_outlined}
            alt="profile-button"
          />
        </Link>
      </div>
    </footer>
    </div>
  )
}
