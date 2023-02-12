import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://188.121.121.255/api/v1',
})
instance.defaults.headers.common['Authorization'] = ` Bearer ${localStorage.getItem("token")}`;

export default instance

