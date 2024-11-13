import axios from "axios"

export default async function registerService(form) {
  const { name, email: userEmail, address, password } = form
  const url = import.meta.env.VITE_REGISTER_API

  try {
    const response = await axios.post(
      url,
      JSON.stringify({
        nome: name,
        email: userEmail,
        endereco: address,
        senha: password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    return response.data
  } catch (error) {
    throw new Error("Failed to fetch" + error)
  }
}
