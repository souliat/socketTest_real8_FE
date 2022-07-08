// axios
// import instance from "../../shared/axios";

// toolkit - Slice
import { createSlice } from '@reduxjs/toolkit';

// API
import { chatAPI } from '../../shared/api';
import { getStorage } from '../../shared/localStorage';

// redux Toolkit
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    list: [],
  },
  reducers: {
    loadChatAction: (state, action) => {
      state.list = action.payload;
    },
    postChatAction: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

// 채팅 목록 불러오기
export const loadChat = id => async dispatch => {
  try {
    console.log("chatSlice loadChat 채팅방 id는?" + id);
    const res = await chatAPI.loadChat(id);
    dispatch(loadChatAction(res.data));
    console.log("채팅목록 불러오기 콘솔 : " + res.data);
  } catch (error) {
    console.log(error);
  }
};

// 채팅 작성하기
export const postChat = (id, message) => async dispatch => {
  try {
    const res = await chatAPI.postChat(id, message);
    console.log('response');
    console.log(res.data);
    dispatch(postChatAction(res.data));
  } catch (error) {
    console.log(error);
  }
};

// 액션,리듀서 내보내기
export const { loadChatAction, postChatAction } = chatSlice.actions;
export default chatSlice.reducer;
