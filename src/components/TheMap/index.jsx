import React, { useState, useEffect } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
  LayerGroup,
  Circle,
} from "react-leaflet"
import markerIcon from "../../assets/red-marker.svg"
import getPosts from "../../utils/getPosts.js"
import "leaflet/dist/leaflet.css"
import "./styles.css"

function ChangeMapView({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center.length === 2) {
      map.setView(center, map.getZoom(), { animate: true })
    }
  }, [center])
  return null
}

export default function TheMap({ centerProp }) {
  const [locationData, setLocationData] = useState([])
  const fillRedOptions = { color: "#3545ff", fillColor: "#3545ff91" }

  useEffect(() => {
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
  }, [])

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  return (
    <>
      <MapContainer
        className="mapPane"
        zoom={16}
        center={centerProp.length === 2 ? centerProp : [-23.68524, -46.620502]}
        minZoom={8}
        scrollWheelZoom={true}
      >
        <ChangeMapView center={centerProp} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // url="https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <LayerGroup>
          <Circle
            center={centerProp}
            pathOptions={fillRedOptions}
            radius={15}
          />
        </LayerGroup>
        {locationData.map((data) => (
          <Marker
            key={data.CodigoDenuncia}
            icon={customIcon}
            position={[
              data.CoordenadasOcorrencia.coordinates[0],
              data.CoordenadasOcorrencia.coordinates[1],
            ]}
          >
            <Tooltip>
              <h2>{data.Descricao.Ocorrencia}</h2>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </>
  )
}
