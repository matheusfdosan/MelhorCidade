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

    if (response.data.acesso) {
      localStorage.setItem(
        "Login",
        JSON.stringify({
          email: emailValue,
          password: passwordValue,
        })
      )

      localStorage.setItem(
        "CookieId",
        JSON.stringify({
          cookie: response.data.cookie,
          id: response.data.id,
          userType: response.data.tipoUsuario,
          username: response.data.nome,
        })
      )

      return {
        serverAcess: response.data.acesso,
        userType: response.data.tipoUsuario,
      }
    }
  } catch (error) {
    console.log("Failed to make login: " + error)
    return error
  }
}
