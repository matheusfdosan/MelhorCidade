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

export default function TheMap({ centerProp, mapIsMovng }) {
  const [locationData, setLocationData] = useState([])
  const fillRedOptions = { color: "#ff353a", fillColor: "#ff353a" }

  useEffect(() => {
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
        zoom={15}
        center={centerProp.length === 2 ? centerProp : [-23.68524, -46.620502]}
        minZoom={8}
        scrollWheelZoom={true}
      >
        <ChangeMapView center={centerProp} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
            key={data.id}
            icon={customIcon}
            onClick={() => handleClickMarker(data.id)}
            position={[data.location.position.lat, data.location.position.long]}
          >
            <Tooltip>
              <h2>{data.title}</h2>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </>
  )
}
