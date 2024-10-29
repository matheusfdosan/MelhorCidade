import axios from "axios"
//
export default async function getLocations() {
  try {
    const response = await axios.get("/posts.json")
    return response.data
  } catch (error) {
    console.log("Failed to fetch posts:" + error)
    throw error
  }
}
