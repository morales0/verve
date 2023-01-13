/**
 * TODO:
 * - Integrate lazy load for performance
 */

// import AuthApp from "./AuthApp";
import React, { useState } from "react";
// import UnauthApp from "./UnauthApp";
import { Anchor, Button, Center, Checkbox, Group, MantineProvider, Paper, PasswordInput, Stack, TextInput } from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

const App = () => {
  const [authStatus, setAuthStatus] = useState("unauthenticated")

  const login = () => setAuthStatus("authenticated")

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      {
        authStatus === "authenticated" ? (
          <AuthApp />
        ) : authStatus === "unauthenticated" ? (
          <UnauthApp login={() => setAuthStatus("authenticated")} />
        ) : authStatus === "loading" ? (
          <div>Loading</div>
        ) : (
          <div>Error: {authStatus}. Try again.</div>
        )
      }
    </MantineProvider>
  )
};

// Temporary apps
const AuthApp = () => {
  return (
    <div>
      Auth app
    </div>
  )
}

type UnauthAppProps = {
  login: () => void
}

const UnauthApp = ({ login }: UnauthAppProps) => {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Center h={"100%"}>
      <Paper radius="sm" p="lg" withBorder >
        <form onSubmit={form.onSubmit(login)}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? "Login to your account here"
                : "Register for an account here"}
            </Anchor>
            <Button type="submit">{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Center>
  )
}

export default App;
