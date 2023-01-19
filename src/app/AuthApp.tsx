import { Box, Flex, ScrollArea } from "@mantine/core"
import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import UserNavbar from "../components/app/UserNavbar"
import Home from "../pages/Home/Home"
import Workout from "../pages/Workout/Workout"

type Props = {}

const AuthApp = () => {
  const [workingOut, setIsWorkingOut] = useState(true)

  return (
    <Flex direction="column" h={"100%"}>
      <UserNavbar />
      <Box
        component={ScrollArea}
        px={"lg"}
        py={"lg"}

        sx={{
          flexGrow: 1,
        }}
      >
        <Routes>
          <Route path="/" element={workingOut ? <Workout /> : <Home />} />
          <Route path="/exercises" element={<div>Exercises</div>} />
          <Route path="/history" element={<div>History</div>} />
          <Route path="/data" element={<div>Data</div>} />
        </Routes>
      </Box>
    </Flex>
  )
}

export default AuthApp
