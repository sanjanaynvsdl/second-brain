import axios from 'axios'



const axiosInstance:any = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL,
    baseURL:'http://localhost:3000/api/v1',
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
})

export default axiosInstance;