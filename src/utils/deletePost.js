import axios from "axios"

export default async function deletePost(postId) {
  const url = import.meta.env.VITE_DELETE_POST

  try {
    const response = await axios.post(url, postId)

    return response.data
  } catch (error) {
    console.log("Failed to delete post: " + error)
    throw error
  }
}
