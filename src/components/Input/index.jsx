import "./styles.css"

export default function Input({
  label,
  type,
  idName,
  placeholder,
  onChangeInput,
  maximum,
  minimum,
  maximumOfLetters
}) {
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
          onChange={onChangeInput}
          max={maximum}
          min={minimum}
          maxLength={maximumOfLetters}
          required
        />
      </label>
    </>
  )
}
