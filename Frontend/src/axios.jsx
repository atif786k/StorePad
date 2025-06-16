import axios from "axios";

const instance = axios.create({
    baseURL: 'https://storepad.up.railway.app/',
    withCredentials: true,
})

export default instance;