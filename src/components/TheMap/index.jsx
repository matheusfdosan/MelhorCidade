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
import ReadReportModal from "../ReadReportModal/index.jsx"

function ChangeMapView({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    if (center.length === 2) {
      map.setView(center, zoom, { animate: true })
    }
  }, [center, zoom])
  return null
}

function DisableMapInteraction({ disable }) {
  const map = useMap()

  useEffect(() => {
    if (disable) {
      map.dragging.disable()
      map.scrollWheelZoom.disable()
      map.boxZoom.disable()
      map.keyboard.disable()
    } else {
      map.dragging.enable()
      map.scrollWheelZoom.enable()
      map.boxZoom.enable()
      map.keyboard.enable()
    }
  }, [disable, map])

  return null
}

export default function TheMap({ centerProp, zoomProp }) {
  const [locationData, setLocationData] = useState([])
  const fillRedOptions = { color: "#3545ff", fillColor: "#3545ff91" }
  const [zoom, setZoom] = useState(zoomProp || 15)
  const [showPostDetailsModal, setShowPostDetailsModal] = useState(false)
  const [specificPost, setSpecificPost] = useState()

  useEffect(() => {
    setZoom(zoomProp) // Atualiza o zoom quando zoomProp muda
  }, [zoomProp])

  useEffect(() => {
    const loadLocationData = async () => {
      try {
        const cookieAndId = localStorage.getItem("CookieId")
        const { cookie, id } = JSON.parse(cookieAndId)

        const request = {
          cookie,
          _idUser: id,
          coordenadas: centerMap,
          zoom: 12,
        }

        const data = await loadPostsNearby(request)
        setLocationData(data.denuncias)
      } catch (error) {
        console.log("Failed to fetch locals: " + error)
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

  const handleClickMarker = (data) => {
    setShowPostDetailsModal(true)
    setSpecificPost(data)
  }

  return (
    <>
      <MapContainer
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={1.0}
        className="mapPane"
        zoom={zoom >= 0 && zoom <= 18 ? zoom : 10}
        center={centerProp.length === 2 ? centerProp : [-23.68524, -46.620502]}
        minZoom={8}
        scrollWheelZoom={true}
      >
        <ChangeMapView center={centerProp} zoom={zoom} />
        <DisableMapInteraction disable={showPostDetailsModal} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayerGroup>
          <Circle center={centerProp} pathOptions={fillRedOptions} radius={15} />
        </LayerGroup>
        {locationData.map((data) => (
          <Marker
            key={data.CodigoDenuncia}
            icon={customIcon}
            position={[
              data.CoordenadasOcorrencia.coordinates[0],
              data.CoordenadasOcorrencia.coordinates[1],
            ]}
            eventHandlers={{
              click: () => {
                handleClickMarker(data)
              },
            }}
          >
            <Tooltip>
              <h2>{data.Descricao.Ocorrencia}</h2>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      {showPostDetailsModal && (
        <ReadReportModal
          specificPostData={specificPost}
          setShowPostDetailsModal={setShowPostDetailsModal}
        />
      )}
    </>
  )
}
