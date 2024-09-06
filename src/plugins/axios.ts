import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost/todo_list_api/'
}) 

export default api
