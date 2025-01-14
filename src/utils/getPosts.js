import axios from "axios"

export default async function getPosts(userCookie, userId, turn) {
  const url = import.meta.env.VITE_LOAD_POST_PER_DATA

  try {
    const response = await axios.post(url, {
      cookie: userCookie,
      _idUser: userId,
      turn: turn,
    })

    return response.data
  } catch (error) {
    console.log("Failed to fetch posts:" + error)
    throw error
  }
}
