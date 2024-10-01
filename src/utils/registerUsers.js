import axios from "axios"

export default async function registerUser(form) {
  const { name, email, address, password } = form

  try {
    axios
      .post(
        "http://localhost:1324/api/users",
        {
          name: name,
          email: email,
          address: address,
          password: password,
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

