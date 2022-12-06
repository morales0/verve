import { Navbar } from "../Navbar/Navbar";
import styled from "styled-components";

const StyledTopNav = styled(Navbar)`
  z-index: 99;

  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  background: #eaeaea;
  color: #333;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.15);

  // All links
  & a {
    display: flex;
    padding: 0.5rem;
    color: inherit;
    text-decoration: none;
  }
`;

const TopNavbar = ({ children }) => {
  return <StyledTopNav>{children}</StyledTopNav>;
};

export default TopNavbar;
