import axios from "axios"

export default async function contentService(
  category,
  address,
  what_happened,
  images,
  coords,
  cookie,
  id
) {
  try {
    const url = import.meta.env.VITE_NEW_REPORT_API
    console.log("Tá aqui: " + url);

    const response = await axios.post(url, {
      Categoria: category,
      Referencia: address,
      Ocorrencia: what_happened,
      Imagens: new Blob([images]),
      CoordenadasOcorrencia: coords,
      cookie: cookie,
      _idUser: id,
    })

    console.log(response)
  } catch (error) {
    console.log("Failed to send complaint:" + error)
    throw error
  }
}
