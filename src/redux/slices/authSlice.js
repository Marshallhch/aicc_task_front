import { createSlice } from '@reduxjs/toolkit'; // 1. slice 생성

const initialState = {
  // 2. 초기 상태 정의
  userName: null,
  userImage: null,
  userToken: null,
  userEmail: null,
};

export const authSlice = createSlice({
  // 3 slice 생성
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.userName;
      state.userImage = action.payload.userImage;
      state.userToken = action.payload.userToken;
      state.userEmail = action.payload.userEmail;
    },
    logout: (state) => {
      state.userName = null;
      state.userImage = null;
      state.userToken = null;
      state.userEmail = null;
    },
  },
});

// const a = { abc: 1, def: 2 };
// console.log(a);
// const { abc, def } = a;

// export const authActions = authSlice.actions;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer; // 4. export 된 함수들을 store에 등록
