import { Box, Flex, Header, ScrollArea } from "@mantine/core"
import { Route, Routes } from "react-router-dom"
import { UserNavbar } from "../components/app"

type Props = {}

const AuthApp = ({}: Props) => {
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
          <Route path="/" element={<div>Home</div>} />
          <Route path="/exercises" element={<div>Exercises</div>} />
          <Route path="/history" element={<div>History</div>} />
          <Route path="/data" element={<div>Data</div>} />
        </Routes>
      </Box>
    </Flex>
  )
}

export default AuthApp
