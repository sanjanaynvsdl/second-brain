import axios from 'axios'

const url = import.meta.env.VITE_API_URL;
// console.log(url);

const axiosInstance:any = axios.create({
    baseURL:url,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
})

export default axiosInstance;