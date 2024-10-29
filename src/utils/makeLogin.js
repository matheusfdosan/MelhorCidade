import axios from "axios";

export default async function makeLogin(email, password) {
  try {
    const response = await axios.post("http://localhost:3000/api/login", {
      email: email,
      senha: password,
    });

    if (response.data.acesso) {
      const userCookie = response.data.cookie
      const userId = response.data.id
      localStorage.setItem("CookieId", JSON.stringify({
        cookie: userCookie,
        id: userId
      }))
      return true
    }
  } catch (error) {
    console.log("Failed to fetch posts:" + error);
    throw error;
  }
}
