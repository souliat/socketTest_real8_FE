import instance from './axios';
import axios from 'axios';
import { getStorage } from './localStorage';

export const userApi = {
  // 로그인
  login: function (data) {
    instance.post('/user/login', data);
  },

  // 회원 가입
  signup: function (data) {
    instance.post('/user/signup', data);
  },
};

export const chatAPI = {
  loadChat: function (id) {
    console.log("loadChat api 호출 전 마지막 id " + id);
    return axios.get(`http://13.125.4.231/api/channel/${id}/messages`, {headers: {Authorization: 'Bearer ' + getStorage('token')}});
    // return instance.get("http://localhost:5001/chat");
  },
  postChat: function (id, message) {
    //chatroom /pub
    return axios.get(`http://13.125.4.231/api/channel/${id}/messages`, message, {headers: {Authorization: 'Bearer ' + getStorage('token')}});
    // return instance.post("http://localhost:5001/chat", chat); 
  },
  loadChannel: function () {
    return axios.get('http://13.125.4.231/api/channels', {headers: {Authorization: 'Bearer ' + getStorage('token')}});
    // return instance.get("http://localhost:5001/channel");
  },
  createChannel: function (channel) {
    return axios.post('http://13.125.4.231/api/channel', channel, {headers: {Authorization: 'Bearer ' + getStorage('token')}});
    // return instance.post("http://localhost:5001/channel", channel);
  },
  deleteChannel: function (list) {
    return axios.delete(`http://13.125.4.231/api/channel/${list.id}`, {headers: {Authorization: 'Bearer ' + getStorage('token')}});
    // return instance.delete(`http://localhost:5001/channel/${list.id}`);
  },
};
