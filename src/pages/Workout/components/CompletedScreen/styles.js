import styled from "styled-components";

const StyledCompletedScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  height: ${({ open }) => (open ? "100%" : "50px")};
  width: 100%;

  background-color: ${({ theme }) => theme.app_bg};
  color: ${({ theme }) => theme.fg};
  border-bottom: 1px solid
    ${({ theme }) => (theme.name === "dark" ? "#a3a3a3" : "#9f9f9f")};

  overflow-y: hidden;
  //transition: height .5s;

  & > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 50px;
    padding: 0 1rem;

    cursor: pointer;

    background-color: ${({ theme }) =>
      theme.name === "dark" ? "#494949" : "#f9f9f9"};
    border-bottom: 1px solid
      ${({ theme }) => (theme.name === "dark" ? "#a3a3a3" : "#9f9f9f")};
  }

  & > .body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    overflow-y: auto;
  }

  & > .footer {
    margin: auto auto 0 auto;
  }
`;

export { StyledCompletedScreen };
