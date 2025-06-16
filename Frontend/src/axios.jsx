import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://storepad.up.railway.app/',
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})

export default instance;