import { useAuth } from "@/context/auth";
import { Home } from "@/screens";
import { Button } from "@mantine/core";
import { Route, Routes } from "react-router-dom";

const UserApp = () => {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default UserApp;
