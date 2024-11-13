import axios from "axios"

export default async function contentService(complaintsData) {
  try {
    const url = import.meta.env.VITE_NEW_REPORT_API

    console.log(complaintsData)

    const response = await axios.post(url, complaintsData, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    console.log(response.data);
    return response.data
  } catch (error) {
    console.log("Failed to send complaint:" + error)
    throw error
  }
}
