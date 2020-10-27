import axios from 'axios'

// axios.defaults.baseURL = 'https://blog.gorit.cn/blog/'
axios.defaults.baseURL = 'http://localhost/'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.response.use((res) => res.data)

export default axios
