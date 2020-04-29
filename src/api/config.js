import axios from 'axios';

export const baseUrl = 'http://192.168.0.113:8080';

// axios 的实例及拦截器配置
const axiosInstance = axios.create({
    baseURL: baseUrl
})

axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.error(err, "网络错误");
    }
)

export {
    axiosInstance
}
