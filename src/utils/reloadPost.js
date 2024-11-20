import axios from "axios"

export default async function reloadPost(commentData) {
  const url = import.meta.env.VITE_RELOAD_POST

  try {
    const response = await axios.post(url, commentData)

    return response
  } catch (error) {
    console.log("Failed to comment: " + error)
    throw error
  }
}
