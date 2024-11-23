import axios from "axios"

export default async function loadPostFiltered(request) {
  const url = import.meta.env.VITE_FILTRAR_POSTS

  try {
    const response = await axios.post(url, request)

    return response.data
  } catch (error) {
    console.log("Failed to posts nearby: " + error)
    throw error
  }
}
