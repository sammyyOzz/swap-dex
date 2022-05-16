import axios from 'axios'

export const baseUrl = "https://139-162-176-138.ip.linodeusercontent.com"

const API = axios.create({ baseURL: baseUrl })

API.interceptors.request.use(req => {

    if (req.url !== ('/accounts/register/' || '/accounts/login/')) {

        if (localStorage.getItem('mint-engine')) {
            req.headers.Authorization = `Token ${JSON.parse(localStorage.getItem('mint-engine'))}`
        }
    
    }

    return req
})

export default API