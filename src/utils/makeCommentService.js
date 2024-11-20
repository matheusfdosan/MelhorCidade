import axios from "axios"

export default async function commentService(comment) {
  const url = import.meta.env.VITE_MAKE_COMMENT

  try {
    const response = await axios.post(url, comment)

    console.log(response)
    return response
  } catch (error) {
    console.log("Failed to comment: " + error)
    throw error
  }
}
