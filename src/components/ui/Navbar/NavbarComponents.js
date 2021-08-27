
const StyledAppNavLink = styled(NavLink)`
   display: flex;
   align-items: center;
   padding: .5rem 1rem;
   width: 100%;
   color: inherit;
   text-decoration: none;
   transition: .2s;

   &:hover {
      background-color: #6b80a2;
   }

   & > .navLinkTitle_text {
      margin-left: 10px;
   }
`

const AppNavLink = ({ icon, title, ...rest }) => {
   const { collapsed } = useContext(NavbarContext)

   return (
      <StyledAppNavLink {...rest}>
         <img src={icon} height='20' />
         {!collapsed && <div className='navLinkTitle_text'>{title}</div>}
      </StyledAppNavLink>
   )
}

const StyledBrand = styled(StyledAppNavLink)`
   justify-content: center;
   font-size: 1.2rem;
   border: none;
`

const NavHeader = styled.div`
   display: flex;
   justify-content: center;

   width: 100%;

   border-bottom: 1px solid #4c4c4c;
`

const StyledNavToggle = styled.button`
   padding: .5rem;
   border: none;
   background: transparent;
   cursor: pointer;

   transform: rotate(${props => props.collapsed ? '0' : '180deg'});

`

const NavToggle = ({icon, collapsed, onClick}) => {
   return (
      <StyledNavToggle collapsed={collapsed} onClick={onClick} >
         <img src={icon} height='20px' />
      </StyledNavToggle>
   )
}

const Brand = ({children, ...rest}) => {
   const { collapsed, setCollapsed } = useContext(NavbarContext)

   return (
      <NavHeader>
         <NavToggle 
            icon={ArrowsIcon}
            collapsed={collapsed}
            onClick={() => setCollapsed(!collapsed)}
         />
         {
            !collapsed && (
               <StyledBrand {...rest}>
                  {children}
               </StyledBrand>
            )
         }
      </NavHeader>
   )
}

const StyledUserLink = styled(StyledAppNavLink)`
   justify-content: center;
   background: #865c5c;
   color: white;
   border-left: 0;
   border-top: 1px solid #4c4c4c;
`

const UserLink = ({ icon, username, ...rest }) => {
   const { collapsed } = useContext(NavbarContext)

   return (
      <StyledUserLink {...rest}>
         <img src={icon} height='20' />
         {!collapsed && <div className='navLinkTitle_text'>{username}</div>}
      </StyledUserLink>
   )
}