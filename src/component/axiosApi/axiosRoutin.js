import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://188.121.121.255/api/v1',
})
instance.defaults.headers.common['Authorization'] = ` Bearer ${localStorage.getItem("token")}`;

export default instance

// axios.defaults.headers.get['Authorization'] = `Bearer ${localStorage.getItem("token")}`,

// axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem("token")}`
