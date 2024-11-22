import axios from "axios"

export default async function registerService(form) {
  const { name, email: userEmail, password } = form
  const url = import.meta.env.VITE_REGISTER_API


  console.log({
    nome: name,
    email: userEmail,
    senha: password,
  });
  try {
    const response = await axios.post(
      url,
      {
        nome: name,
        email: userEmail,
        senha: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    return response.data
  } catch (error) {
    return error
  }
}
