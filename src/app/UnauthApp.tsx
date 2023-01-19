import { Center } from "@mantine/core"
import { AuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth"
import AuthForm from "../components/app/AuthForm"
import { useAuth } from "../context/auth"

const UnauthApp = () => {
  const { auth } = useAuth()

  const signIn = async (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)
  const signInGoogle = async () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  return (
    <Center h={"100%"}>
      <AuthForm signIn={signIn} signInGoogle={signInGoogle}/>
    </Center>
  )
}

export default UnauthApp