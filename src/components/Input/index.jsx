import "./styles.css"

export default function Input({ label, type, idName, placeholder }) {
  return (
    <>
      <label className="label-input" htmlFor={idName}>
        {label}
        <input
          type={type}
          name={idName}
          id={idName}
          className="input"
          placeholder={placeholder}
          required
        />
      </label>
    </>
  )
}
