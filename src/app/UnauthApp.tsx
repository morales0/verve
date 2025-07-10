import { app } from "@/firebase/config";
import { Stack, Text, rem } from "@mantine/core";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { AuthForm } from "@/components/forms";

const UnauthApp = () => {
  const auth = getAuth(app);

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
