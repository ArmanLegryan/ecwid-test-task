import axios from 'axios'

const STORE_ID = import.meta.env.VITE_STORE_ID
const TOKEN = import.meta.env.VITE_TOKEN

const api = axios.create({
  baseURL: `https://app.ecwid.com/api/v3/${STORE_ID}`,
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${TOKEN}`,
  },
})

export default api
