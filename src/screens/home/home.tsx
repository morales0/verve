import { FocusAreas, Today, WeekTracker } from "@/components/app";
import { ThemeToggle, TopBar } from "@/components/ui";
import { ActionIcon, Box, Button, Divider, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconPlus, IconSettings } from "@tabler/icons-react";
import classes from "./home.module.css";
import { QuickLog } from "./quick-log";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <Stack align="stretch" mih="100vh" pb={75}>
      {/* Top nav bar with theme toggle and account access */}
      <TopBar>
        <SimpleGrid cols={3} p="xs">
          <ThemeToggle />
          <Text ta="center">verve</Text>
          <ActionIcon ml="auto" size="md">
            <IconSettings stroke={1} />
          </ActionIcon>
        </SimpleGrid>
      </TopBar>

      <Stack px="sm" mb="lg" style={{ flexGrow: 1 }}>
        {/* Focus areas section */}
        <FocusAreas />

        {/* Week tracker */}
        <WeekTracker />

        {/* Today's exercises */}
        <Divider w="90%" mx="auto" />
        <Today />
      </Stack>

      <Box pos="fixed" bottom={0} w="100%" mt="auto" className={classes.control}>
        <Paper radius="xl" m="xs" className={classes.paper}>
          <Group grow gap={0} className={classes.group}>
            <QuickLog />
            <Button
              className={classes.logBtn}
              rightSection={<IconPlus size={20} />}
              radius="xl"
              component={Link}
              to="/active-log"
            >
              Log
            </Button>
          </Group>
        </Paper>
      </Box>
    </Stack>
  );
};
