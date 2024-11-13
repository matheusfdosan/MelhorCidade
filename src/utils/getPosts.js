import axios from "axios"

export default async function getPosts(userCookie, userId, ) {
  const url = import.meta.env.VITE_LOAD_POST_PER_DATA

  try {
    const response = await axios.post(
      url,
      JSON.stringify({ cookie: userCookie, _idUser: userId, turn: 0 }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    
    return response.data
  } catch (error) {
    console.log("Failed to fetch posts:" + error)
    throw error
  }
}
