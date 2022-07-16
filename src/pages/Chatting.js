import React from 'react';

import styled from 'styled-components';

// 리덕스 = history가 browser_router느낌
import { useDispatch, useSelector } from 'react-redux';

// 소켓 통신
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// components  = Notfound
import { getStorage } from '../shared/localStorage';
import { loadChat} from '../redux/modules/chatSlice';

const Chatting = props => {
  const chat_data = useSelector(state => state.chat.list);

  console.log(`chat_data: ${chat_data}`);
  console.log("chat_data_ggg : "+chat_data);

  // 웹 소켓 통신
  const dispatch = useDispatch();

  // 소켓 통신 객체 // 백엔드서버
  const sock = new SockJS('http://3.39.6.175/chatting');
  // const sock = new SockJS('http://localhost:8080/chatting');
  const ws = Stomp.over(sock);

  // 토큰
  const token = getStorage('token');

  // sender 정보 가져오기
  const sender = getStorage('nickname');
  console.log(`token: ${token}`);
  console.log(`sender: ${sender}`);

  // MemberId 정보 가져오기. 편도랑 2022-07-07
  const memberId = getStorage('memberId');
  console.log("memberId" + memberId);

  // 렌더링 될 때마다 연결, 구독 다른 방으로 옮길 때 연결, 구독 해제
  React.useEffect(() => {
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [props.id]); //channelId

  // 웹소켓 연결, 구독
  function wsConnectSubscribe() {
    try {
      ws.connect(
        {
          token: token,
        },
        () => {
          ws.subscribe(
            `/sub/api/chat/rooms/${parseInt(props.id)}`,
            // `/sub/api/chat/rooms/${getStorage('channelId')}`,
            data => {
              const newMessage = JSON.parse(data.body);
              console.log(newMessage);
              console.log("props.id :" + props.id);
              console.log("웹소켓 연결 구독 : " + newMessage.roomId);
              dispatch(loadChat(newMessage.roomId));
              // dispatch(loadChat(getStorage('channleId')));
            },
            { token: token }
          );
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // 연결해제, 구독해제
  function wsDisConnectUnsubscribe() {
    try {
      ws.disconnect(
        () => {
          ws.unsubscribe('sub-0');
        },
        { token: token }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // 웹소켓이 연결될 때 까지 실행하는 함수
  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }

  // 메시지 보내기
  function sendMessage() {
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!token) {
        alert('토큰이 없습니다. 다시 로그인 해주세요.');
        window.location.replace('/');
      }
      // send할 데이터
      const data = {
        type: 'TALK',
        roomId: props.id,
        sender: sender,
        memberId: memberId,  // 2022-07-07 추가 편도랑.
        // message: message_ref,
        message: message_ref.current.value,
      };

      console.log("send할 데이터"+JSON.stringify(data));

      // console.log("chat_data"+JSON.stringify(chat_data));
      // 빈문자열이면 리턴
      if (message_ref === '') {
        return;
      }
      // 로딩 중
      waitForConnection(ws, function () {
        ws.send('/pub/api/chat/message', { token: token }, JSON.stringify(data));
        console.log(ws.ws.readyState);

        // 메세지 전송 후 다시 메세지 목록 조회하는 요청? 필요 없음!! 지우니까 401 에러 사라짐
        // dispatch(postChat(data.roomId, data.message));
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  }

  const message_ref = React.useRef(null);
  return (
    <React.Fragment>
      <p style={{fontWeight:"bold"}}>Chatting</p>
      <>
      <ChatListContainer id ='ChatListContainerDiv'>
        <ChatList>
          {chat_data &&
            chat_data.map((list, index) => {
              return (
                <ChatContent key={index}>
                  <p>
                    {/* userID : {list.id} */}
                    {list.sender} :
                    <br />
                    {list.message}
                  </p>
                </ChatContent>
              );
            })}
        </ChatList>
      </ChatListContainer>
        <ChatPost>
          <ChatToolUp>
            <p>🟠🟡🟢🟤🔵🟣</p>
          </ChatToolUp>
          <form onSubmit={sendMessage}>
            <input id='inputMessage' ref={message_ref} className='Content' type='text' placeholder='멍친구에게 메시지 보내기'></input>
            <ChatToolDown>
              <p>
                🟣🔵🟤🟠🟡🟢
                <img
                  src='https://cdn-icons-png.flaticon.com/512/149/149446.png'
                  alt='Post'
                  type='button'
                  onClick={() => {
                    sendMessage();
                    document.querySelector('#inputMessage').value = '';
                  }}
                />
              </p>
            </ChatToolDown>
          </form>
        </ChatPost>
      </>
    </React.Fragment>
  );
};

// params 받아온거를 api get요청 하나 더 만들어서 roomId를 디스패치하고
// chatList 부분에 noRoom && Chatting 비교해서 출력한다.
const ChatListContainer = styled.div`
  width: 80.5%;
  max-height: 74%;
  overflow-y: auto !important;
  overflow-x: hidden;
`;

const ChatList = styled.div`
  width: 1230%;
  min-height: 100%;
  background-color: #f78d70;

  & p {
    color: black;
    padding: 15px;
  }
`;

const ChatContent = styled.div`
width: 81%;
  background-color: #ffffff;
  flex-direction: column;
  margin: 5px 0 auto;
  & p {
    color: black;
    padding: 15px;
  }
`;

const ChatPost = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 110px;
  background-color: white;
  border-radius: 10px;

  & input {
    margin-left: 5px;
    width: 1140px;
    height: 40px;
    border: none;
  }
  img {
    width: 15px;
    cursor: pointer;
    margin: -4px 4px;
  }
`;

const ChatToolUp = styled.div`
width: 80.5%;
  height: 30px;
  background-color: #f78d70;
  border-radius: 10px 10px 0px 0px;
  & p {
    color: black;
    padding: 7px;
  }
`;

const ChatToolDown = styled.div`
  width: 80.5%;
  height: 30px;
  background-color: #f78d70;
  margin: 8px 0;
  border-radius: 0px 0px 10px 10px;
  & p {
    color: black;
    padding: 7px;
  }
  img {
    float: right;
    width: 25px;
    cursor: pointer;
  }
`;
export default Chatting;
