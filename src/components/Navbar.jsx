import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth); // auth: store.js에 정의된 reducer 객체요소의 키

  const [isAuth, setIsAuth] = useState(!userInfo); // userInfo가 없는 상태 초기화

  const handleLoginSuccess = (credentialResponse) => {
    const userData = jwtDecode(credentialResponse.credential);
    // userData.jti
    dispatch(
      login({
        userName: userData.given_name,
        userImage: userData.picture,
        userToken: userData.jti,
        userEmail: userData.email,
      })
    );

    setIsAuth(true);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('userToken');
    if (storedUser) {
      dispatch(
        login({
          userName: userInfo.name,
          userImage: userInfo.picture,
          userToken: userInfo.jti,
          userEmail: userInfo.email,
        })
      );
      setIsAuth(true);
    }
  }, [dispatch]);

  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
      callback: handleLoginSuccess,
    });
  }

  const handleLogin = () => {
    window.google.accounts.id.prompt();
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsAuth(false);
    console.log('logout');
  };

  return (
    <div className="navi">
      {/* <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      /> */}

      {isAuth ? (
        <div>
          <h2>{userInfo.name}님 로그인</h2>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
      ) : (
        <div>
          <h2>로그인이 필요합니다.</h2>
          <button onClick={handleLogin}>LOGIN</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

// (credentialResponse) => {
//   const userInfo = jwtDecode(credentialResponse.credential);
//   // console.log(credentialResponse);
//   console.log(userInfo.jti);
//   console.log(userInfo.email);
//   console.log(userInfo.given_name);
//   console.log(userInfo.picture);
// }
