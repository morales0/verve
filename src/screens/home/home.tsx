import { FocusAreas, Today, WeekTracker } from "@/components/app";
import { ThemeToggle, TopBar } from "@/components/ui";
import { useAuth } from "@/context";
import { ActionIcon, Box, Divider, Group, Menu, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import classes from "./home.module.css";
import { LogButton } from "./log-button";
import { QuickLogButton } from "./quick-log-button";

export const Home = () => {
  const { signOut } = useAuth();

  return (
    <Stack align="stretch" mih="100vh" pb={75}>
      {/* Top nav bar with theme toggle and account access */}
      <TopBar>
        <SimpleGrid cols={3} p="xs">
          <ThemeToggle />
          <Text ta="center">verve</Text>
          <Menu>
            <Menu.Target>
              <ActionIcon ml="auto" size="md">
                <IconSettings stroke={1} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconLogout size={14} />} onClick={signOut}>
                Sign Out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </SimpleGrid>
      </TopBar>

      <Stack px="sm" mb="lg" style={{ flexGrow: 1 }}>
        <FocusAreas />

        <WeekTracker />

        <Divider w="90%" mx="auto" />
        <Today />
      </Stack>

      <Box pos="fixed" bottom={0} w="100%" mt="auto" className={classes.control}>
        <Paper radius="xl" m="xs" className={classes.paper}>
          <Group grow gap={0} className={classes.group}>
            <QuickLogButton />
            <LogButton />
          </Group>
        </Paper>
      </Box>
    </Stack>
  );
};
