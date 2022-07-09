import React from "react";
import styled from "styled-components";
// image
import mung from '../assets/mung.jpg';

const NoRoom = (props) => {
  return (
    <Container>
      <img
        // src="https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-large/1f331@2x.png"
        src = {mung}
        height = "150"
      /><br/><br/>
      <h1>멍친구와 채팅하기</h1><br/>
      <h5>🐶매칭된 멍친구와 채팅해요~!!🐶</h5><br/>

      <span>멍친9함..ㅎ</span>
    </Container>
  );
};

const Container = styled.div`
  width: 310px;
  margin: 12% 35% auto;
  text-align: center;

  & h1 { 
    font-size: 20px;
    font-weight: bold;
  }

  & span {
    color : blue;
  }
`;

export default NoRoom;
