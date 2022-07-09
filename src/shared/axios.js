import axios from 'axios';
import { getStorage } from './localStorage';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  // baseURL: 'http://3.39.6.175',
  headers: { 'Content-Type': 'application/json' },
});

// 토큰값;
const token = getStorage('token');

if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
