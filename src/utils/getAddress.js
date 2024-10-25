import axios from "axios"

export default async function getAddress(address) {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`)
    return response.data
  } catch (error) {
    console.log("Failed to fetch locals:" + error)
    throw error
  }
}
