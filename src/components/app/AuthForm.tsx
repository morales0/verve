import { Anchor, Button, Group, Paper, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { UserCredential } from "firebase/auth";

type Props = {
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signInGoogle: () => Promise<UserCredential>;
};

type FormValues = {
  email: string;
  name: string;
  password: string;
};

const AuthForm = ({ signIn, signInGoogle }: Props) => {
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
    signIn(email, password).catch((e) => {
      console.log("Error logging in: ", e);
    });
  };

  return (
    <Paper radius="sm" p="lg" withBorder>
      <form onSubmit={form.onSubmit(submitAuthForm)}>
        <Stack>
          <Button onClick={signInGoogle}>Google</Button>
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
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
            error={form.errors.email && "Invalid email"}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
            error={form.errors.password && "Password should include at least 6 characters"}
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor component="button" type="button" color="dimmed" onClick={() => toggle()} size="xs">
            {type === "register" ? "Login to your account here" : "Register for an account here"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
};

export default AuthForm;
