//import authAxios from './config'
import { authAxios } from './config';

export const SignUp = async (data) => {
    const response = await authAxios.post(`/register`,data);
    return response.data;
}

export const SignIn = async (data) => {
    const response = await authAxios.post(`/login`,data);
    return response.data;
}

export const Logout = async (data) => {   
    const response = await authAxios.post(`/logout`,data);
    return response.data;
}

export const IdeasUser = async (id,data) => {   
    const response = await authAxios.post(`/comments/${id}`,data);
    return response.data;
}

export const IdeasWithUser = async (page) => {   
    const response = await authAxios.get(`/comments?page=${page}`);
    return response.data;
}

export const NewIdea = async (data) => {   
    const response = await authAxios.post(`/comments`,data);
    return response.data;
}

export const UpdateIdea = async (id,data) => {   
    const response = await authAxios.post(`/comments/${id}`,data);
    return response.data;
}

export const DeleteIdea = async (id,data) => {   
    const response = await authAxios.post(`/comments/${id}`,data);
    return response.data;
}

export const getUser = async (id) => {   
    const response = await authAxios.get(`/user/${id}`);
    return response.data;
}