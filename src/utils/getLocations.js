import axios from "axios"

export default async function getLocations() {
  try {
    const response = await axios.get("/location.json")
    return response.data
  } catch (error) {
    console.log("Failed to fetch locals:" + error)
    throw error
  }
}
