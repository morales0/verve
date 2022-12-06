import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useNavbar } from "../Navbar/Navbar";

// Nav groups
const MainNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledCollapseNav = styled.ul`
  list-style: none;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  background: #dadada;
  border-top: 1px solid #aaa;
`;

const CollapseNav = ({ children }) => {
  const { open } = useNavbar();

  return <StyledCollapseNav open={open}>{children}</StyledCollapseNav>;
};

const StyledHamburgerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 17px;
  width: 20px;
  margin: 0 0.5rem;
  cursor: pointer;

  & > div {
    width: 100%;
    height: 2px;
    background: black;
  }
`;

const Hamburger = () => {
  const { open, setOpen } = useNavbar();

  return (
    <StyledHamburgerContainer onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledHamburgerContainer>
  );
};

const NavGroup = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column;

  & > li {
    display: flex;
  }
`;

// Nav links
const StyledAppNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  width: 100%;
  color: inherit;
  text-decoration: none;
  transition: 0.2s;

  &:hover {
    background-color: #6b80a2;
  }

  & > .navLinkTitle_text {
    margin-left: 10px;
  }
`;

const AppNavLink = ({ icon, title, ...rest }) => {
  const { open } = useNavbar();

  return (
    <StyledAppNavLink {...rest}>
      <img src={icon} height="20" />
      {open && <div className="navLinkTitle_text">{title}</div>}
    </StyledAppNavLink>
  );
};

// Brand link
const BrandLink = styled(NavLink)`
  padding: 0.5rem;
  text-decoration: none;
  color: inherit;
`;

//  User link
const UserLink = styled(NavLink)`
  padding: 0.5rem;
  text-decoration: none;
  color: inherit;
`;

export {
  MainNav,
  CollapseNav,
  Hamburger,
  NavGroup,
  AppNavLink,
  BrandLink,
  UserLink,
};
