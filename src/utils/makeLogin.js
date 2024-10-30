import axios from "axios";

export default async function makeLogin(email, password) {
  try {
    const response = await axios.post("http://localhost:3000/api/login", {
      email: email,
      senha: password,
    });

    console.log(response.data);

    if (response.data.acesso) {
      const userCookie = response.data.cookie
      const userId = response.data.id
      return {serverResponse: response.data.acesso, cookie: userCookie, id: userId}
    }
  } catch (error) {
    console.log("Failed to make login:" + error);
    throw error;
  }
}
