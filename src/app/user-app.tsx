import { useAuth } from "@/context/auth";
import { Button } from "@mantine/core";
import { Route, Routes } from "react-router-dom";

const UserApp = () => {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Button>Primary</Button>
          </>
        }
      />
    </Routes>
  );
};

export default UserApp;
