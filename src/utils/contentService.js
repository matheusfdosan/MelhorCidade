import axios from "axios"

export default async function contentService(
  category,
  address,
  what_happened,
  files,
  coords,
  cookie,
  id
) {
  try {
    const url = import.meta.env.VITE_NEW_REPORT_API

    const response = await axios.post(
      url,
      JSON.stringify({
        Categoria: category,
        Referencia: address,
        Ocorrencia: what_happened,
        Images: files,
        CoordenadasOcorrencia: coords,
        cookie: cookie,
        _idUser: id,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    console.log(response.data)
  } catch (error) {
    console.log("Failed to send complaint:" + error)
    throw error
  }
}
