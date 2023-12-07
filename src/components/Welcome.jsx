import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Welcome = ({ currentUser }) => {
  return (
    <>
    <Container>
        {/* <img src="" alt="" /> */}
        <h1>Welcome, <span>{currentUser.username}</span></h1>
        <h3>Please select a chat to start Message</h3>
    </Container>
    </>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    span {
        color: #4e0eff;
      }
`;

export default Welcome;