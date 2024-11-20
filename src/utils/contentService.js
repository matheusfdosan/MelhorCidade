import axios from "axios"

export default async function contentService(complaintsData) {
  try {
    const url = import.meta.env.VITE_NEW_REPORT_API

    const response = await axios.post(url, complaintsData, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    
    return response.data
  } catch (error) {
    console.log("Failed to send complaint:" + error)
    throw error
  }
}
