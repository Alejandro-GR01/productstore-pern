import api from "../config/axios";



export const loginuser = async(userData)=> {
    await api.post('/auth/login', userData)
}