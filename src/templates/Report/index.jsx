import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useEffect } from "react"
import React, { useState, useRef, useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import getAddress from "../../utils/getAddress"
import "./styles.css"
import uploadIcon from "../../assets/upload-icon.svg"
import markerIcon from "../../assets/red-marker-filled-icon.svg"
import FooterLinks from "../../components/FooterLinks"

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

function DraggableMarker({ position, setPosition }) {
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newPosition = marker.getLatLng()
          setPosition(newPosition)
        }
      },
    }),
    [setPosition]
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      icon={customIcon}
      ref={markerRef}
    />
  )
}

export default function Report() {
  const [inputAddress, setInputAddress] = useState()
  const [address, setAddress] = useState()
  const [complaintImage, setComplaintImage] = useState()
  const [positionMap, setPositionMap] = useState(null)

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        const { latitude, longitude } = position.coords
        setPositionMap({ lat: latitude, lng: longitude })
      } catch (err) {
        setError("Não foi possível obter a localização.")
        console.error(err)
      }
    }

    getUserLocation()
    document.title = "Melhor Cidade - Fazer Denúncia"
  }, [])

  useEffect(() => {
    const fetchAddress = async () => {
      if (positionMap) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${positionMap.lat}&lon=${positionMap.lng}&format=json`
          )
          const data = await response.json()
          setAddress(data.display_name || "Endereço não encontrado")
        } catch (error) {
          console.error("Erro ao buscar o endereço:", error)
          setAddress("Erro ao buscar o endereço")
        }
      }
    }

    fetchAddress()
  }, [positionMap])

  const handleAddressInput = (e) => {
    setInputAddress(e.target.value)
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

  const handleAnalyzeClick = () => {
    const getTheAddress = async () => {
      try {
        const data = await getAddress(inputAddress)
        setPositionMap({lat: data[0].lat, lng: data[0].lon})
      } catch (error) {
        console.log("Failed to fetch posts:" + error)
      }
    }
    
    getTheAddress()
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
        <div id="set_address">
          <input
            type="text"
            id="location_input"
            
            required
            placeholder="Endereço: rua/avenida, bairro, estado"
            onChange={handleAddressInput}
          />
          <button type="button" onClick={handleAnalyzeClick}>
            Analisar
          </button>
        </div>

        <address id="address_in_map">{address}</address>

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
          {positionMap && (
            <MapContainer center={positionMap} zoom={20} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {positionMap && (
                <DraggableMarker
                  position={positionMap}
                  setPosition={setPositionMap}
                />
              )}
            </MapContainer>
          )}
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

        <button className="post-btn">Publicar</button>
      </form>
      <FooterLinks />

      <Footer target={1} />
    </>
  )
}
