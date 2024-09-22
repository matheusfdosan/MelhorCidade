export default async function registerUser(form) {
  
  const { name, email, age, phone, address, password } = form

  try {
    const response = await fetch(
      `http://localhost:3000/criarConta/${name}/${email}/${password}/${phone}/${age}/${address}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Isso vai evitar o erro de CORS, mas limita a resposta
      }
    )
    
    if (response.ok) {
      console.log("Data sent successfully!" + response)
    }
  } catch (error) {
    throw new Error("Failed to fetch" + error)
  }
}
