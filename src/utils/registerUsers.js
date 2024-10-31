import axios from "axios"

export default async function registerUser(form) {
  const { name, email, address, password } = form

  try {
    axios
      .post(
        "http://localhost:3002/api/",
        {
          nome: name,
          email: email,
          endereco: address,
          senha: password,
        },
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

