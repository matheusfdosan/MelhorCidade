import axios from "axios"

export default async function loadUsersPosts(userInfo) {
  const url = import.meta.env.VITE_LOAD_USER_POSTS

  try {
    const response = await axios.post(url, userInfo)
    
    return response.data
  } catch (error) {
    console.log("Failed to fetch users posts: " + error)
    throw error
  }
}
