import { Center } from "@mantine/core"
import AuthForm from "../components/app/AuthForm"

type Props = {
  login: () => void
}

const UnauthApp = ({ login }: Props) => {
  return (
    <Center h={"100%"}>
      <AuthForm login={login} />
    </Center>
  )
}

export default UnauthApp