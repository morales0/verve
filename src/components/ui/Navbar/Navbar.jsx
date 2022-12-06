import { createContext, useContext, useState } from "react";

// Navbar context
const NavbarContext = createContext({});
const useNavbar = () => useContext(NavbarContext);

// Navbar gateway component
const Navbar = ({ children, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <NavbarContext.Provider value={{ open, setOpen }}>
      <nav className={className}>{children}</nav>
    </NavbarContext.Provider>
  );
};

export { Navbar, useNavbar };
