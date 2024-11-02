import "./styles.css"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import FooterLinks from "../../components/FooterLinks"

import { useEffect } from "react"
import React, { useState, useRef, useMemo } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"

import uploadIcon from "../../assets/rounded-plus-icon.svg"
import markerIcon from "../../assets/red-marker-filled-icon.svg"

import geocodeService from "../../utils/geocodeService"
import reverseGeocodeService from "../../utils/reverseGeocodeService"
import contentService from "../../utils/contentService"

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

function ChangeMapView({ center }) {
  const map = useMap()

  useEffect(() => {
    if (center.length === 2) {
      map.setView(center, map.getZoom(), { animate: true })
    }
  }, [center])

  return null
}

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
  const [positionMap, setPositionMap] = useState(null)
  const [images, setImages] = useState(null)
  const [centerMap, setCenterMap] = useState([])
  const [complaintImageFirst, setComplaintImageFirst] = useState()
  const [complaintImageSecond, setComplaintImageSecond] = useState()
  const [complaintImageThird, setComplaintImageThird] = useState()

  const [form, setForm] = useState({
    what_happend: "",
    category: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        const { latitude, longitude } = position.coords
        setPositionMap({ lat: latitude, lng: longitude })
        setCenterMap([latitude, longitude])
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
          const response = await reverseGeocodeService(
            positionMap.lat,
            positionMap.lng
          )
          const data = response
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

  const handleImageChange = async (e) => {
    if (!(e.target && e.target.files && e.target.files.length > 0)) {
      return
    }
    console.log();
    const file = e.target.files[0]

    if (file) {
      const buffer = await file.arrayBuffer()

      setImages(buffer)

      const reader = new FileReader()
      reader.onload = () => {
        if (e.target.id == "add_first_img"){
          setComplaintImageFirst(reader.result)
        } else if (e.target.id == "add_second_img") {
          setComplaintImageSecond(reader.result)
        } else if (e.target.id == "add_third_img") {
          setComplaintImageThird(reader.result)

        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitComplaint = (e) => {
    e.preventDefault()

    const cookieAndId = localStorage.getItem("cookieId")
    const userCookie = JSON.parse(cookieAndId).cookie
    const userId = JSON.parse(cookieAndId).id

    console.log(
      form.category,
      address,
      form.what_happend,
      images,
      { latitude: positionMap.lat, longitude: positionMap.lng },
      userCookie,
      userId
    )

    // contentService(
    //   form.category,
    //   address,
    //   form.what_happend,
    //   images,
    //   { latitude: positionMap.lat, longitude: positionMap.lng },
    //   userCookie,
    //   userId
    // );
  }

  const handleAnalyzeClick = () => {
    const getCoordinates = async () => {
      try {
        const data = await geocodeService(inputAddress)
        setPositionMap({ lat: data[0].lat, lng: data[0].lon })
        setCenterMap([data[0].lat, data[0].lon])
      } catch (error) {
        console.log("Failed to fetch posts:" + error)
      }
    }

    getCoordinates()
  }

  return (
    <>
      <Header />

      <form id="main_report" onSubmit={handleSubmitComplaint}>
        <label htmlFor="what_happened">Conte-nos o que aconteceu:</label>
        <textarea
          placeholder="O que aconteceu?"
          id="what_happened"
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="category">Categoria do problema:</label>
        <select name="complaints_category" id="complaints_category">
          <option>Espaços Públicos e Áreas de Lazer</option>
          <option>Iluminação Pública</option>
          <option>Infraestrutura Viária</option>
          <option>Serviços de Transporte e Mobilidade</option>
          <option>Saneamento Básico</option>
          <option>Segurança Urbana</option>
          <option>Problemas com Telefonia e Internet</option>
          <option>Poluição e Meio Ambiente</option>
          <option>Edificações e Estruturas Públicas</option>
          <option>Saúde Pública e Controle de Pragas</option>
          <option>Equipamentos Públicos e Tecnológicos</option>
          <option>Outro...</option>
        </select>

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
            <MapContainer
              center={
                positionMap.length == 2 ? positionMap : [-23.68524, -46.620502]
              }
              zoom={15}
              minZoom={8}
              scrollWheelZoom={true}
            >
              <ChangeMapView center={centerMap} />
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

        <label>Adicione algumas imagens do problema:</label>
        <div id="add_img_grid">
          <label
            className="add_img"
            htmlFor="add_first_img"
            style={{ backgroundImage: "url(" + complaintImageFirst + ")" }}
          >
            {complaintImageFirst ? (
              ""
            ) : (
              <>
                <img src={uploadIcon} alt="upload-icon" />
              </>
            )}
          </label>

          <label
            className="add_img"
            htmlFor="add_second_img"
            style={{ backgroundImage: "url(" + complaintImageSecond + ")" }}
          >
            {complaintImageSecond ? (
              ""
            ) : (
              <>
                <img src={uploadIcon} alt="upload-icon" />
              </>
            )}
          </label>

          <label
            className="add_img"
            htmlFor="add_third_img"
            style={{ backgroundImage: "url(" + complaintImageThird + ")" }}
          >
            {complaintImageThird ? (
              ""
            ) : (
              <>
                <img src={uploadIcon} alt="upload-icon" />
              </>
            )}
          </label>
        </div>

        <input
          type="file"
          accept="image/*"
          required
          id="add_first_img"
          className="file_input"
          onChange={handleImageChange}
        />

        <input
          type="file"
          accept="image/*"
          required
          id="add_second_img"
          className="file_input"
          onChange={handleImageChange}
        />

        <input
          type="file"
          accept="image/*"
          required
          id="add_third_img"
          className="file_input"
          onChange={handleImageChange}
        />

        <button className="post-btn" type="submit">
          Publicar
        </button>
      </form>
      <FooterLinks />

      <Footer target={1} />
    </>
  )
}
