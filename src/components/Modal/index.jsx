import React from "react"
import "./styles.css"
import verifiedIcon from "../../assets/verified-icon.png"
import errorLink from "../../assets/error-icon.svg"

function Modal({ message }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {message === "Denúncia enviada com sucesso!" ? (
          <>
            <img src={verifiedIcon} alt="verified-icon" />
            <p>{message}</p>
          </>
        ) : (
          <>
            <img src={errorLink} alt="error-icon" />
            <p>{message}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default Modal
