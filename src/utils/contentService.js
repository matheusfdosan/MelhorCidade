import axios from "axios"
export default async function contentService(formData) {
  try {
    const url = import.meta.env.VITE_NEW_REPORT_API

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })

    console.log("foi")

    console.log(response.data)
  } catch (error) {
    console.log("Failed to send complaint:" + error)
    throw error
  }
}
