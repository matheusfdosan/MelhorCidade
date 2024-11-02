import axios from "axios"

export default async function reverseGeocodeService(lat, lng) {
  const acessToken = import.meta.env.VITE_ACESS_TOKEN_LOCATIONIQ
  
  try {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/reverse?key=${acessToken}&lat=${lat}&lon=${lng}&format=json&`
    )
    return response.data
  } catch (error) {
    console.log("Failed to fetch locals:" + error)
    throw error
  }
}
