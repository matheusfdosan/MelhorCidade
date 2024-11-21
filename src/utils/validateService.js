import axios from "axios"

export default async function validateService(validate) {
  const url = import.meta.env.VITE_VALIDATE

  try {
    const response = await axios.post(url, validate)

    return response.data
  } catch (error) {
    console.log("Failed to validate: " + error)
    throw error
  }
}
