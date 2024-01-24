import { useAuth } from "@/context/auth";
import { useUser } from "@/context/user";
import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Button,
  ColorSwatch,
  Group,
  MantineColorScheme,
  Paper,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useFocusTrap } from "@mantine/hooks";
import { signOut, updateProfile } from "firebase/auth";
import { useState } from "react";
import globalClasses from "@/styles/app.module.css";

const THEME_COLORS = ["indigo", "cyan", "pink", "orange"];
const THEME_AVATARS = ["happy", "excited", "angry", "love", "dead"];

export const User = () => {
  const { auth } = useAuth();
  const { authData: user } = useUser();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const usernameInputRef = useFocusTrap();
  const [isEditUsername, { open, close }] = useDisclosure(false);
  const [username, setUsername] = useState(user?.displayName ?? "");
  const [avatar, setAvatar] = useState("happy");
  const [accentColor, setAccentColor] = useState("indigo");

  const updateUsername = (value: string) => updateProfile(user, { displayName: value }).then(() => close());
  const toggleEditUsername = () => {
    setUsername(user?.displayName ?? "");
    open();
  };

  return (
    <Stack p="sm" h="100%" className={globalClasses.scrollable}>
      <Stack gap="xs">
        <Text fz="sm" fw={500}>
          Account
        </Text>
        <Paper radius="md" p="md">
          <Stack align="flex-start" gap={rem(6)}>
            <Stack gap={0}>
              <Group gap="xs">
                <Text c="dimmed" fz="xs" fw={500}>
                  Username
                </Text>

                {isEditUsername ? (
                  <Group gap="xs">
                    <ActionIcon size="xs" variant="transparent" color="red" onClick={close}>
                      <Icon icon="material-symbols-light:close" />
                    </ActionIcon>
                    <ActionIcon size="xs" variant="transparent" color="teal" onClick={() => updateUsername(username)}>
                      <Icon icon="material-symbols-light:check" />
                    </ActionIcon>
                  </Group>
                ) : (
                  <ActionIcon size="xs" variant="transparent" color="indigo" onClick={toggleEditUsername}>
                    <Icon icon="material-symbols:edit" />
                  </ActionIcon>
                )}
              </Group>
              {isEditUsername ? (
                <TextInput ref={usernameInputRef} value={username} onChange={(e) => setUsername(e.target.value)} />
              ) : (
                <Text>{user.displayName ?? "---"}</Text>
              )}
            </Stack>

            <Stack gap={0} align="flex-start">
              <Group gap="xs">
                <Text c="dimmed" fz="xs" fw={500}>
                  Email
                </Text>
              </Group>
              <Text>{user.email ?? "---"}</Text>
              <Button variant="transparent" p={0} size="compact-sm">
                Change password
              </Button>
            </Stack>

            <Button color="yellow" variant="transparent" p={0} size="compact-sm" onClick={() => signOut(auth)}>
              Sign out
            </Button>
          </Stack>
        </Paper>
      </Stack>

      <Stack gap="xs">
        <Text fz="sm" fw={500}>
          Customization
        </Text>
        <Paper radius="md" p="md">
          <Stack gap="xs">
            <Stack gap={rem(6)}>
              <Text c="dimmed" fz="xs" fw={500}>
                Avatar
              </Text>
              <Group grow>
                {THEME_AVATARS.map((av) => (
                  <ActionIcon
                    key={av}
                    size="lg"
                    color={accentColor}
                    variant={avatar === av ? "outline" : "transparent"}
                    onClick={() => setAvatar(av)}
                  >
                    <Icon icon={`mdi:robot-${av}-outline`} width={28} />
                  </ActionIcon>
                ))}
              </Group>
            </Stack>

            <Stack gap={rem(6)}>
              <Text c="dimmed" fz="xs" fw={500}>
                Accent color
              </Text>
              <Group justify="space-evenly">
                {THEME_COLORS.map((color) => (
                  <ActionIcon
                    key={color}
                    color={color}
                    radius="md"
                    variant={color === accentColor ? "filled" : "light"}
                    onClick={() => setAccentColor(color)}
                  />
                ))}
              </Group>
            </Stack>

            <Stack gap={rem(6)}>
              <Group gap="xs">
                <Text c="dimmed" fz="xs" fw={500}>
                  Theme
                </Text>
              </Group>
              <SegmentedControl
                value={colorScheme}
                onChange={(value: string) => setColorScheme(value as MantineColorScheme)}
                data={[
                  { label: "Light", value: "light" },
                  { label: "Dark", value: "dark" },
                  { label: "System", value: "auto" },
                ]}
              />
            </Stack>

            <Stack gap={rem(6)}>
              <Text c="dimmed" fz="xs" fw={500}>
                Start of the week{" "}
                <Text span fw={400} fz="inherit">
                  (Coming soon)
                </Text>
              </Text>
              <SegmentedControl
                disabled
                defaultValue="sunday"
                data={[
                  { label: "Sunday", value: "sunday" },
                  { label: "Monday", value: "monday" },
                ]}
              />
            </Stack>

            <Stack gap={rem(6)}>
              <Text c="dimmed" fz="xs" fw={500}>
                Units{" "}
                <Text span fw={400} fz="inherit">
                  (Coming soon)
                </Text>
              </Text>
              <SegmentedControl
                disabled
                defaultValue="imperial"
                data={[
                  { label: "Imperial", value: "imperial" },
                  { label: "Metric", value: "metric" },
                ]}
              />
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
};
