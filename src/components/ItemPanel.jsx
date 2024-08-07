import React from 'react';
import { useSelector } from 'react-redux';

const ItemPanel = () => {
  const userInfo = useSelector((state) => state.auth.userToken);

  console.log(userInfo);
  return (
    <div className="panel">
      {userInfo ? (
        <h2>{userInfo.userName}님 로그인 되었습니다.</h2>
      ) : (
        <h2>로그인이 필요합니다.</h2>
      )}
    </div>
  );
};

export default ItemPanel;
