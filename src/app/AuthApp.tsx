import { Box, Flex, Header, ScrollArea } from "@mantine/core"
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
        
      </Box>
    </Flex>
  )
}

export default AuthApp