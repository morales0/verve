import { AuthForm } from "@/components/forms";
import { useAuth } from "@/context";
import { Stack, Text } from "@mantine/core";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

// todo: guest version of app?
const UnauthApp = () => {
  const { auth } = useAuth();

  const signIn = async (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
  const register = async (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
  const signInGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  return (
    <Stack h="100vh" align="center" justify="flex-start">
      <Text c="white" fz={30} py={80}>
        Welcome to{" "}
        <Text span fz="inherit" fw={600}>
          verve
        </Text>
      </Text>
      <AuthForm signIn={signIn} register={register} signInGoogle={signInGoogle} />
    </Stack>
  );
};

export default UnauthApp;
