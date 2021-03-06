// react
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// style
import styled from 'styled-components';

// token
import { getStorage, clearStorage } from '../shared/localStorage';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = getStorage('token');

    if (check) {
      setIsLogin(true);
    }
  }, []);

  const logout = () => {
    console.log('λ‘κ·Έμμ');
    clearStorage('token');
    clearStorage('useremail');
    clearStorage('nickname');
    clearStorage('memberId');
    window.location.replace('/');
    navigate('/');
  };

  return (
    <TopBar>
      <ul>π¬</ul>
      {isLogin && (
        <div className='logout' onClick={logout}>
          <p>logout β</p>
        </div>
      )}
      <div className='search'>
        {/* <input type='text' placeholder='κ²μμ΄ μλ ₯' />
        <img src='https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png' alt='Search' /> */}
      </div>
    </TopBar>
  );
};

const TopBar = styled.div`
  /* width: 1535px; */
  height: 40px;
  background-color: #fbf1e8;
  //border: 1px white solid;
}
  // .search {
  //   position: relative;
  //   width: 400px;
  //   margin: 3px auto;
  // }
  // input {
  //   width: 100%;
  //   height: 10px;
  //   border: 1px solid #bbb;
  //   padding: 14px 12px;
  //   font-size: 14px;
  // }
  // img {
  //   position: absolute;
  //   width: 15px;
  //   top: 6px;
  //   right: 12px;
  //   margin: 0;
  //   cursor: pointer;
  // }
  p {
    float: right;
    color: white;
    margin: 11px;
    cursor: pointer;
  }
  ul {
    float: left;
    color: white;
    margin: 11px;
    cursor: pointer;
  }
  .logout {
    cursor: pointer;
    & p {
      color: black;
      font-weight: bold;
    }
  }
`;

export default Header;
