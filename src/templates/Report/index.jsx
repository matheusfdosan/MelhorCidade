import "./styles.css"

import Footer from "../../components/Footer"
import FooterLinks from "../../components/FooterLinks"
import Header from "../../components/Header"

import "leaflet/dist/leaflet.css"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"

import markerIcon from "../../assets/red-marker-filled-icon.svg"
import uploadIcon from "../../assets/rounded-plus-icon.svg"

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
  const [centerMap, setCenterMap] = useState([])

  const [complaintImageFirst, setComplaintImageFirst] = useState()
  const [complaintImageSecond, setComplaintImageSecond] = useState()
  const [complaintImageThird, setComplaintImageThird] = useState()
  const [files, setFiles] = useState({
    img1: "",
    img2: "",
    img3: "",
  })

  const [whatHappend, setWhatHappend] = useState()
  const [category, setCategory] = useState("Espaços Públicos e Áreas de Lazer")

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

    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (e.target.id == "add_first_img") {
          setComplaintImageFirst(reader.result)
          setFiles((prevFiles) => ({ ...prevFiles, img1: file }))
        } else if (e.target.id == "add_second_img") {
          setComplaintImageSecond(reader.result)
          setFiles((prevFiles) => ({ ...prevFiles, img2: file }))
        } else if (e.target.id == "add_third_img") {
          setComplaintImageThird(reader.result)
          setFiles((prevFiles) => ({ ...prevFiles, img3: file }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleWhatHappendInput = (e) => {
    setWhatHappend(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleSubmitComplaint = (e) => {
    e.preventDefault()

    const cookieAndId = localStorage.getItem("CookieId")

    const sendPostData = async () => {
      try {
        const coords = {
          latitude: positionMap.lat,
          longitude: positionMap.lng,
        }

        const cookie = JSON.parse(cookieAndId).cookie
        const id = JSON.parse(cookieAndId).id

        const formData = new FormData()
        formData.append("Categoria", category || "")
        formData.append("Referencia", address || "")
        formData.append("Ocorrencia", whatHappend || "")
        formData.append("CoordenadasOcorrencia", JSON.stringify(coords) || "")
        formData.append("cookie", cookie || "")
        formData.append("_idUser", id || "")

        if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i])
          }
        }

        const formValues = {
          categoria: formData.get("Categoria"),
          referencia: formData.get("Referencia"),
          ocorrencia: formData.get("Ocorrencia"),
          files: formData.getAll("files"),
          CoordenadasOcorrencia: formData.get("CoordenadasOcorrencia"),
          cookie: formData.get("cookie"),
          _idUser: formData.get("_idUser"),
        }

        console.log(formValues)

        contentService(formData)
      } catch (err) {
        console.log("Error to send post data: " + err)
      }
    }

    sendPostData()
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
          onChange={handleWhatHappendInput}
          required
        ></textarea>

        <label htmlFor="category">Categoria do problema:</label>
        <select
          name="complaints_category"
          id="category"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="Espaços Públicos e Áreas de Lazer">
            Espaços Públicos e Áreas de Lazer
          </option>
          <option value="Iluminação Pública">Iluminação Pública</option>
          <option value="Infraestrutura Viária">Infraestrutura Viária</option>
          <option value="Serviços de Transporte e Mobilidade">
            Serviços de Transporte e Mobilidade
          </option>
          <option value="Saneamento Básico">Saneamento Básico</option>
          <option value="Segurança Urbana">Segurança Urbana</option>
          <option value="Problemas com Telefonia e Internet">
            Problemas com Telefonia e Internet
          </option>
          <option value="Poluição e Meio Ambiente">
            Poluição e Meio Ambiente
          </option>
          <option value="Edificações e Estruturas Públicas">
            Edificações e Estruturas Públicas
          </option>
          <option value="Saúde Pública e Controle de Pragas">
            Saúde Pública e Controle de Pragas
          </option>
          <option value="Equipamentos Públicos e Tecnológicos">
            Equipamentos Públicos e Tecnológicos
          </option>
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
            Posicionar
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
          id="add_first_img"
          className="file_input"
          multiple
          onChange={handleImageChange}
        />

        <input
          type="file"
          accept="image/*"
          id="add_second_img"
          className="file_input"
          multiple
          onChange={handleImageChange}
        />

        <input
          type="file"
          accept="image/*"
          id="add_third_img"
          className="file_input"
          multiple
          onChange={handleImageChange}
        />

        <button className="post-btn" type="submit">
          Publicar
        </button>
      </form>

      <div id="report_footer">
        <FooterLinks />
      </div>

      <Footer target={1} />
    </>
  )
}
