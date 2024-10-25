import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useEffect } from "react"
import React, { useState, useRef, useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import getAddress from "../../utils/getAddress"
import "./styles.css"
import uploadIcon from "../../assets/upload-icon.svg"
import markerIcon from "../../assets/red-marker-filled-icon.svg"

const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
})

// Centro de São Paulo
const center = {
  lat: -23.5506507,
  lng: -46.6333824,
}

function DraggableMarker() {
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    []
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      icon={customIcon}
      ref={markerRef}
    >
      <Popup minWidth={90}></Popup>
    </Marker>
  )
}

export default function Report() {
  const [inputAddress, setInputAddress] = useState()
  const [address, setAddress] = useState()
  const [complaintImage, setComplaintImage] = useState()

  useEffect(() => {
    document.title = "Melhor Cidade - Fazer Denúncia"
  }, [])

  const handleAddressInput = (e) => {
    setInputAddress(e.target.value)

    const getTheAddress = async () => {
      try {
        const data = await getAddress(inputAddress)
        setAddress(data[0].display_name)
      } catch (error) {
        console.log("Failed to fetch posts:" + error)
      }
    }

    getTheAddress()
  }

  const handleImageChange = (e) => {
    if (!(e.target && e.target.files && e.target.files.length > 0)) {
      return
    }

    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setComplaintImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitComplaint = (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <>
      <Header />

      <form id="main_report" onSubmit={handleSubmitComplaint}>
        <label htmlFor="what_happened">Conte-nos o que aconteceu:</label>
        <textarea
          placeholder="O que aconteceu?"
          id="what_happened"
          required
        ></textarea>

        <label htmlFor="location_input">
          Diga onde está localizado esse problema:
        </label>
        <input
          type="text"
          id="location_input"
          required
          placeholder="Endereço: rua/avenida, bairro, estado"
          onChange={handleAddressInput}
        />

        <label htmlFor="point_on_the_map">
          Aponte-o no mapa:{" "}
          <span
            id="doubt"
            title="Mova o marcador para onde se encontra o problema"
          >
            *
          </span>
        </label>
        <div id="point_on_the_map">
          <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker position={center} />
          </MapContainer>
        </div>

        <label>Adicione uma imagem do problema</label>
        <label
          htmlFor="add_image_btn"
          style={{ backgroundImage: "url(" + complaintImage + ")" }}
        >
          {complaintImage ? (
            ""
          ) : (
            <>
              <img src={uploadIcon} alt="upload-icon" />
              <p>Adicione uma imagem</p>
            </>
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          required
          id="add_image_btn"
          onChange={handleImageChange}
        />

        <button className="post-btn">Postar</button>
      </form>

      <Footer target={1} />
    </>
  )
}
