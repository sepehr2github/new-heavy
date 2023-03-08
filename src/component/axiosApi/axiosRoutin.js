import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://api.ddem.ir/api/v1',
})
instance.defaults.headers.common['Authorization'] = ` Bearer ${localStorage.getItem("token")}`;

export default instance

