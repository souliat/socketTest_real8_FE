// redux
import { createSlice } from '@reduxjs/toolkit';

// localstorage
import { getStorage, setStorage } from '../../shared/localStorage';
import axios from 'axios';

// axios
import instance from '../../shared/axios';

export const login = userData => {
  return async function (dispatch) {
    try {
      const response = await axios.post('http://3.39.6.175/member/login', { username: userData.username, password: userData.password });
      console.log('로그인 성공');
      console.log(response.data);
      console.log('토큰값', response.data.accessToken);
      setStorage('token', response.data.accessToken);
      // setStorage('useremail', response.data.useremail);
      setStorage('nickname', response.data.nickname);
      setStorage('memberId', response.data.memberId);  // ""로 키값을 썼을 때 setStorage가 안됐음. 스크립트는 홑따옴표 씀.
      dispatch(checkLogin(getStorage('token')));

    } catch (error) {
      console.log('로그인 실패');
      alert(error);
    }
  };
};

// export const createUser = userData => {
//   return async function (navigate) {
//     try {
//       console.log('회원가입 정보');
//       console.log(userData);
//       await axios.post('http://13.125.217.60:8080/user/signup', userData);
//       navigate('/chat');
//     } catch (error) {
//       alert(error);
//       navigate('/');
//     }
//   };
// };

const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
    isLogin: false,
  },
  reducers: {
    loadUser: (state, action) => {
      state.list = [...action.payload];
    },
    updateUser: (state, action) => {
      // 내용 채우기
    },
    checkLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { loadUser, updateUser, checkLogin } = userSlice.actions;
export default userSlice.reducer;
