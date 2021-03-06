// react
import React from 'react';

// style
import styled from 'styled-components';

// pages
import { Chatting, NoRoom } from './index';

// redux
import { useDispatch, useSelector } from 'react-redux';

// router
import { useNavigate, useParams } from 'react-router-dom';

// toolkit - Slice
import { loadChat } from '../redux/modules/chatSlice';
import { loadChannel, createChannel, deleteChannel } from '../redux/modules/channelSlice';

// page
import Header from '../components/Header';

import logout from '../assets/logout.png';
const Chat = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const channel_ref = React.useRef(null);

  // state에 axiso get한 데이터 불러오기
  const channel_data = useSelector(state => state.channel.list);

  // 첫 렌더링
  React.useEffect(() => {
    dispatch(loadChannel());
  }, [dispatch]);

  React.useEffect(() => { 
    if (id) {
      console.log("useEffect >> LoadChat넘기기전 id : " + id);
      dispatch(loadChat(id));
    }
  }, [dispatch]);

  // from 새로고침 없이 추가하기
  const addChannel = event => {
    event.preventDefault();
    createChannelList();
  };

  // ref 받아서 axios 추가 요청 보내는 함수(버튼)
  // 요청보내고 빈칸 만들기 '';
  const createChannelList = () => {
    dispatch(
      createChannel({
        channel: channel_ref.current.value,
        memberId: 2,
      })
    );
    channel_ref.current.value = '';
  };

  return (
    <React.Fragment>
      <Container>
        <Header></Header>
        <div style={{ display: 'flex' }}>
          {/* <LeftBar>
            <div id='circle'></div>
          </LeftBar> */}
          <div style={{backgroundColor: '#F2F3F6'}}>
            <WorkSpace>
              <p>Mung Friend</p>
            </WorkSpace>
            <ChannelList2>
                <p>🔽 개설된 채팅방</p>
                {channel_data &&
                  channel_data.map((list, index) => {
                    return (
                      <ChannelListBox
                        key={index}
                        onClick={() => {
                          navigate(`/Chat/${list.id}`);
                          // clearStorage('channelId');
                          // setStorage('channelId', `${list.id}`);
                        }}
                      >
                        <p>🐶 {list.channel}</p>
                        <div
                          onClick={() => {
                            dispatch(deleteChannel(list));
                          }}
                        >
                          <img src={logout} />
                          
                        </div>
                      </ChannelListBox>
                    );
                  })}
                <form onSubmit={addChannel} style={{ margin: '20px 20px' }}>
                  <input type='text' ref={channel_ref} placeholder='채널 이름'></input>
                  <button onClick={() => addChannel}>채널추가</button>
                </form>
              </ChannelList2>
          </div>

          {/* 우측 메인 화면 */}
          <div style={{width: '100%'}}>
            <ChannelTitle>
              <p>멍친구와 대화하기</p>
            </ChannelTitle>

            <BookMark>
              <p>+ 공지 사항</p>
            </BookMark>

            <ChatBox>
              <ChatList>
                {!id && <NoRoom />}
                {id && <Chatting id={id} />}
              </ChatList>
            </ChatBox>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};
const Container = styled.div`
  // width: 100%;
  // height: 100%;
`;

const WorkSpace = styled.div`
  width: 300px;
  height: 80px;
  padding: 10px 0;
  background-color: #ffffff;
  & p {
    color: black;
    font-size: 30px;
    padding: 15px;
  }
`;

const ChannelList2 = styled.div`
  width: 300px;
  //height: 450px;
  height: 100%;
  // border-top: 1px black solid;
  background-color: #F2F3F6;
  & p {
    color: black;
    padding: 10px;
  }
`;
const ChannelListBox = styled.div`
  width: 300px;
  height: 30px;
  background-color: #F2F3F6;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  position: relative;

  & p {
    color: black;
  }
  & div {
    cursor: pointer;
    top: 0;
    right: 0px;
  }
  & img {
    width: 25px;
    margin-top: 7px;
  }
`;

const ChannelTitle = styled.div`
  width: 100%;
  height: 50px;
  background-color: #F67452;
  & p {
    color: white;
    padding: 15px;
  }
`;

const BookMark = styled.div`
  width: 100%;
  height: 30px;
  background-color: #f78d70;
  & p {
    color: white;
    font-size: 12px;
    padding: 10px;
  }
`;
const ChatBox = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #ffffff;
  margin: 5px & p {
    color: black;
    padding: 15px;
  }
`;

const ChatList = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 600px;

  & p {
    color: black;
    padding: 15px;
  }
`;


export default Chat;
