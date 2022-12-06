import styled from "styled-components";

const StyledWorkoutView = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  & > div:nth-of-type(2) {
    margin-top: 50px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5rem;
  overflow-y: auto;
`;

export { StyledWorkoutView, Body };
