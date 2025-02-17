import axios from 'axios'


const axiosInstance:any = axios.create({
    baseURL: 'http://localhost:300/api/v1',
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 1000
})

export default axiosInstance;