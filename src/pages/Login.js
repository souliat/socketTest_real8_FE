// react
import React, { useEffect, useRef } from 'react';

// router
import { useNavigate, Link } from 'react-router-dom';

// style
import styled from 'styled-components';

// image
import google from '../assets/googlelogo.png';
import apple from '../assets/applelogo.png';

// redux
import { useDispatch, useSelector } from 'react-redux';

// aixos
import { login } from '../redux/modules/userSlice';

const Login = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.isLogin);

  useEffect(() => {
    if (isLogin) {
      navigate('/chat');
    }
  }, [isLogin]);

  const inputUsername = useRef('');
  const inputPwd = useRef('');

  const handleSignUp = event => {
    event.preventDefault();

    let usernameValue = inputUsername.current.value;
    let pwdValue = inputPwd.current.value;

    // 공백 체크
    if (usernameValue.trim() === '') {
      return false;
    }
    if (pwdValue.trim() === '') {
      return false;
    }

    const userData = { username: usernameValue, password: pwdValue };
    dispatch(login(userData));

    inputUsername.current.value = '';
    inputPwd.current.value = '';
  };

  return (
    <React.Fragment>
      <SignUpForm onSubmit={handleSignUp}>
        <SignUp>
          <span>Slack을 처음 사용하시나요?</span>
          <Link to='/signup'>
            <span>계정 생성</span>
          </Link>
        </SignUp>
        <Link to={'/'}>
          <Logo>
            <img height='48' src='https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg' alt='슬랙 로고' />
          </Logo>
        </Link>
        <Guide>이메일로 로그인 해보세요</Guide>
        <Reco>직장에서 사용하는 이메일 주소로 로그인하는걸 추천드려요.</Reco>
        <InputBox>
          <button>
            <img style={{ height: '20px', margin: 'auto 5px' }} src={google} alt='구글 로고' />
            Google 계정으로 로그인
          </button>
          <button>
            <img style={{ height: '25px', boxSizing: 'border-box' }} src={apple} alt='애플 로고' />
            Apple 계정으로 로그인
          </button>
          <Line>또는</Line>
          <input ref={inputUsername} type='text' placeholder='이메일을 입력하세요.' />
          <input ref={inputPwd} type='password' placeholder='비밀번호를 입력해주세요.' />
          <button onClick={() => handleSignUp}>이메일로 로그인</button>
        </InputBox>
      </SignUpForm>
    </React.Fragment>
  );
};

const SignUp = styled.div`
  position: absolute;
  right: 5%;
  top: 15%;
  font-size: 14px;
  span {
    font-weight: bold;
  }
  span:first-child {
    display: block;
    text-align: right;
  }
  span:last-child {
    color: #1e90ff;
  }
`;
const Logo = styled.div`
  cursor: pointer;
`;
const Guide = styled.span``;
const Reco = styled.span``;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin: 0 auto;
  ${Logo} {
    margin: 45px 0 25px 0;
  }
  ${Guide} {
    display: block;
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 36px;
  }
  ${Reco} {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 15px;
  }
`;

const InputBox = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 100%;
    padding: 8px;
    outline: none;
    border: 1.7px solid black;
    font-size: 18px;
    box-sizing: border-box;
    border-radius: 5px;
  }
  input:last-of-type {
    margin-top: 10px;
  }
  input:focus {
    border: 1.7px solid #1e90ff;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 46px;
    padding: 10px 0;
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
  }
  button:first-of-type {
    color: #1e90ff;
    border: 2px solid #1e90ff;
  }
  button:nth-of-type(2) {
  }
  button:last-of-type {
    color: #fff;
    background-color: #27242c;
  }
  button:last-of-type:hover {
    background-color: #121016;
  }
`;

const Line = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  margin: 10px 0;
  &::before {
    content: '';
    flex-grow: 1;
    margin-right: 16px;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
  &::after {
    content: '';
    flex-grow: 1;
    margin-left: 16px;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
`;

export default Login;
