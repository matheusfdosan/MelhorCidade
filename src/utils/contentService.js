export default async function contentService(
  category,
  address,
  what_happened,
  filesArray,
  coords,
  cookie,
  id
) {
  try {
    const url = import.meta.env.VITE_NEW_REPORT_API

    console.log(
      "TENTANDO MANDAR PARA O BANCO DE DADOS:",
      category,
      address,
      what_happened,
      filesArray,
      coords,
      cookie,
      id,
    )

    const response = await fetch(url, {
      method: "post",
      body: {
        Categoria: category,
        Referencia: address,
        Ocorrencia: what_happened,
        files: filesArray,
        CoordenadasOcorrencia: coords,
        cookie: cookie,
        _idUser: id,
      },
    })

    console.log("foi");

    console.log(response)
  } catch (error) {
    console.log("Failed to send complaint:" + error)
    throw error
  }
}
