import axios from "axios";

export default async function makePost(
  category,
  address,
  what_happened,
  images,
  coords,
  cookie,
  id
) {
  try {
    console.log("entroy");

    const response = await axios.post(
      "http://localhost:3001/api/novaDenuncia",
      {
        Categoria: category,
        Referencia: address,
        Ocorrencia: what_happened,
        Imagens: new Blob([images]),
        CoordenadasOcorrencia: coords,
        cookie: cookie,
        _idUser: id,
      }
    );

    console.log(response);
  } catch (error) {
    console.log("Failed to send complaint:" + error);
    throw error;
  }
}
