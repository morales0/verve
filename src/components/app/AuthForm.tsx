import { Anchor, Button, Divider, Group, Paper, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { UserCredential } from "firebase/auth";
import { GoogleButton } from "./google-button";

type Props = {
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signInGoogle: () => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
};

type FormValues = {
  email: string;
  name: string;
  password: string;
};

const AuthForm = ({ signIn, signInGoogle, register }: Props) => {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
    },
  });

  const submitAuthForm = ({ email, password, name }: FormValues) => {
    if (type === "login") {
      signIn(email, password).catch((e) => {
        console.log("Error logging in: ", e);
      });
    }
    if (type === "register") {
      register(email, password);
    }
  };

  return (
    <Paper radius="sm" p="lg" withBorder shadow="md">
      <form onSubmit={form.onSubmit(submitAuthForm)}>
        <Stack>
          <GoogleButton radius="xl" onClick={signInGoogle}>
            Google
          </GoogleButton>
          <Divider label="Or continue with email" labelPosition="center" my="sm" />
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="me@myverve.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
            error={form.errors.email && "Invalid email"}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
            error={form.errors.password && "Password should include at least 6 characters"}
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" onClick={() => toggle()} size="xs">
            {type === "register" ? "Login to your account" : "Register for an account"}
          </Anchor>
          <Button type="submit" color={type === "login" ? "indigo" : "teal"}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default AuthForm;
