
import axios from 'axios';
import { Alert } from '../utilities/Alert';

export const URL = "http://localhost:8000/api";


export const authAxios = axios.create({
    baseURL: URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        "Content-Type": "application/json" ,
        
    }
});