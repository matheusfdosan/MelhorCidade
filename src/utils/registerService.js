import axios from "axios"

export default async function registerService(form) {
  const { name, email, address, password } = form
  const url = import.meta.env.VITE_REGISTER_API

  try {
    axios
      .post(
        url,
        JSON.stringify({
          nome: name,
          email: email,
          endereco: address,
          senha: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Data sent successfully!", response.data)
      })
      .catch((error) => {
        console.error("Failed to fetch:", error)
      })
  } catch (error) {
    throw new Error("Failed to fetch" + error)
  }
}
