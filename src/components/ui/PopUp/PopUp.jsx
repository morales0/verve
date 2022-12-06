import { useState } from "react";
import styled from "styled-components";

// Pop up will fill up a large portion of
// the screen and cover the back with a dark screen
const PopUp = ({ children, isOpen, close, title }) => {
  return (
    <StyledPopUp isOpen={isOpen}>
      <Box>
        <Header>
          <h3>{title}</h3>
          <CloseBtn onClick={close}>x</CloseBtn>
        </Header>
        <Content>{children}</Content>
      </Box>
    </StyledPopUp>
  );
};

const StyledPopUp = styled.div`
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: 100%;
  height: 100vh;
  background: #00000050;
`;

const Box = styled.div`
  position: relative;
  display: grid;
  grid-template: auto 1fr / 100%;
  margin: 0 auto;
  margin-top: calc(10vh - 20px);
  width: 80%;
  height: auto;
  max-height: 70vh;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #999;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1rem;

  border-bottom: 1px solid #999;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  overflow-y: auto;
`;

const CloseBtn = styled.button`
  content: "x";
  width: 25px;
  height: 25px;
  background: transparent;
  border: none;
  line-height: 20px;
  text-align: center;
  font-size: 20px;
  color: #434343;
  cursor: pointer;
`;

export default PopUp;
