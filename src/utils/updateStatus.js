import axios from "axios"

export default async function updateStatus(complaint) {
  const url = import.meta.env.VITE_UPDATE_STATUS

  try {
    const response = await axios.post(url, complaint)
    
    console.log(complaint);
    console.log(response.data);

    return response.data
  } catch (error) {
    console.log("Failed to update status: " + error)
    throw error
  }
}
