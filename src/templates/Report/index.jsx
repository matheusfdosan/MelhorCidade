import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import React, { useState, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import getAddress from "../../utils/getAddress";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import uploadIcon from "../../assets/upload-icon.svg";
import markerIcon from "../../assets/red-marker-filled-icon.svg";
import FooterLinks from "../../components/FooterLinks";
import contentService from "../../utils/contentService";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function ChangeMapView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center.length === 2) {
      map.setView(center, map.getZoom(), { animate: true });
    }
  }, [center]);

  return null;
}

function DraggableMarker({ position, setPosition }) {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          setPosition(newPosition);
        }
      },
    }),
    [setPosition]
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      icon={customIcon}
      ref={markerRef}
    />
  );
}

export default function Report() {
  const [inputAddress, setInputAddress] = useState();
  const [address, setAddress] = useState();
  const [complaintImage, setComplaintImage] = useState();
  const [positionMap, setPositionMap] = useState(null);
  const [images, setImages] = useState(null);
  const [centerMap, setCenterMap] = useState([]);

  const [form, setForm] = useState({
    what_happend: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        setPositionMap({ lat: latitude, lng: longitude });
        setCenterMap([latitude, longitude]);
      } catch (err) {
        setError("Não foi possível obter a localização.");
        console.error(err);
      }
    };

    getUserLocation();
    document.title = "Melhor Cidade - Fazer Denúncia";
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      if (positionMap) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${positionMap.lat}&lon=${positionMap.lng}&format=json`
          );
          const data = await response.json();
          setAddress(data.display_name || "Endereço não encontrado");
        } catch (error) {
          console.error("Erro ao buscar o endereço:", error);
          setAddress("Erro ao buscar o endereço");
        }
      }
    };

    fetchAddress();
  }, [positionMap]);

  const handleAddressInput = (e) => {
    setInputAddress(e.target.value);
  };

  const handleImageChange = async (e) => {
    if (!(e.target && e.target.files && e.target.files.length > 0)) {
      return;
    }

    const file = e.target.files[0];

    if (file) {
      const buffer = await file.arrayBuffer();

      setImages(buffer);

      const reader = new FileReader();
      reader.onload = () => {
        setComplaintImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitComplaint = (e) => {
    e.preventDefault();

    const cookieAndId = localStorage.getItem("cookieId");
    const userCookie = JSON.parse(cookieAndId).cookie;
    const userId = JSON.parse(cookieAndId).id;

    console.log(
      form.category,
      address,
      form.what_happend,
      images,
      { latitude: positionMap.lat, longitude: positionMap.lng },
      userCookie,
      userId
    );

    // contentService(
    //   form.category,
    //   address,
    //   form.what_happend,
    //   images,
    //   { latitude: positionMap.lat, longitude: positionMap.lng },
    //   userCookie,
    //   userId
    // );
  };

  const handleAnalyzeClick = () => {
    const getTheAddress = async () => {
      try {
        const data = await getAddress(inputAddress);
        setPositionMap({ lat: data[0].lat, lng: data[0].lon });
        setCenterMap([data[0].lat, data[0].lon]);
      } catch (error) {
        console.log("Failed to fetch posts:" + error);
      }
    };

    getTheAddress();
  };

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
        <input
          id="category"
          type="text"
          list="complaints_category"
          onChange={handleChange}
          required
        />

        <datalist id="complaints_category">
          <option value="Chocolate"></option>
          <option value="Coconut"></option>
          <option value="Mint"></option>
          <option value="Strawberry"></option>
          <option value="Vanilla"></option>
        </datalist>

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

        <button className="post-btn" type="submit">
          Publicar
        </button>
      </form>
      <FooterLinks />

      <Footer target={1} />
    </>
  );
}
