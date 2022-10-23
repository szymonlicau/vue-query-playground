import axios from 'axios';

export const defaultClient = axios.create({
  baseURL: 'https://dummyjson.com/',
  headers: {
    'Content-Type': 'application/json'
  }
});
