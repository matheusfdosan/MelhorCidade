import { useState } from "react"
import eyeClose from "../../assets/eye-close-icon.svg"
import eyeOpen from "../../assets/eye-open-icon.svg"
import "./styles.css"

export default function Input({
  label,
  type,
  idName,
  placeholder,
  onChangeInput,
  maximum,
  minimum,
  maximumOfLetters,
}) {
  const [showPassword, setShowPassword] = useState(false)

  const handleSeePasswordButtonClick = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      {type === "password" ? (
        <label className="label_input" htmlFor={idName}>
          {label}
          <div id="password_container">
            <input
              type={!showPassword ? "password" : "text"}
              name={idName}
              id={idName}
              placeholder={placeholder}
              onChange={onChangeInput}
              max={maximum}
              min={minimum}
              maxLength={maximumOfLetters}
              required
            />
            <button type="button" onClick={handleSeePasswordButtonClick}>
              {showPassword ? (
                <img src={eyeOpen} className="eye" alt="eye-open" />
              ) : (
                <img src={eyeClose} className="eye" alt="eye-close" />
              )}
            </button>
          </div>
        </label>
      ) : (
        <label className="label_input" htmlFor={idName}>
          {label}
          <input
            type={type}
            name={idName}
            id={idName}
            className="input"
            placeholder={placeholder}
            onChange={onChangeInput}
            max={maximum}
            min={minimum}
            maxLength={maximumOfLetters}
            required
          />
        </label>
      )}
    </>
  )
}
