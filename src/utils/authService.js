import axios from "axios"

export default async function authService(emailValue, passwordValue) {
  const url = import.meta.env.VITE_ACESS_API

  try {
    const response = await axios.post(
      url,
      JSON.stringify({ email: emailValue, senha: passwordValue }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    console.log(response.data);

    if (response.data.acesso) {
      const userCookie = response.data.cookie
      const userId = response.data.id
      return {
        serverResponse: response.data.acesso,
        cookie: userCookie,
        id: userId,
      }
    }
  } catch (error) {
    console.log("Failed to make login: " + error)
    throw error
  }
}
