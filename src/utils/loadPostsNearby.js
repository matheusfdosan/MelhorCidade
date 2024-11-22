import axios from "axios"

export default async function loadPostsNearby(request) {
  const url = import.meta.env.VITE_LOAD_POSTS_NEARBY

  try {
    const response = await axios.post(url, request)

    return response.data
  } catch (error) {
    console.log("Failed to posts nearby: " + error)
    throw error
  }
}
