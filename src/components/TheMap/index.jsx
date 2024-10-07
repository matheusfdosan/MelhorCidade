import React, { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet"
import markerIcon from "../../assets/red-marker.svg"
import getLocations from "../../utils/getLocations"
import "leaflet/dist/leaflet.css"
import "./styles.css"

export default function TheMap() {
  const [locationData, setLocationData] = useState([])

  useEffect(() => {
    const loadLocationData = async () => {
      try {
        const data = await getLocations()
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
    <MapContainer
      className="mapPane"
      center={[-23.68524, -46.620502]}
      zoom={15}
      minZoom={8}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {locationData.map((data, index) => (
        <Marker
          key={data.id || index}
          icon={customIcon}
          position={[data.location.lat, data.location.long]}
        >
          <Tooltip>
            <b>{data.name}</b> {/* Nome do local exibido no Tooltip */}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  )
}
