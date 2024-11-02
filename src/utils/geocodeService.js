import axios from "axios"

export default async function geocodeService(address) {
  const acessToken = import.meta.env.VITE_ACESS_TOKEN_LOCATIONIQ
  try {
    const response = await axios.get(`https://us1.locationiq.com/v1/search?key=${acessToken}&q=${address}&format=json&`)
    return response.data
  } catch (error) {
    console.log("Failed to fetch locals:" + error)
    throw error
  }
}
