const { default: axios } = require("axios");
const api = axios.create({
    baseURL: 'https://e-commerce-backend-next.vercel.app'
})

export default api;