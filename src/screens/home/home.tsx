import {
  ActionIcon,
  Box,
  Divider,
  SimpleGrid,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSettings, IconSun } from "@tabler/icons-react";
import { FocusAreas } from "./focus-areas";
import classes from "./home.module.css";
import { LogFAB } from "./log-fab";
import { Today } from "./today";
import { WeekTracker } from "./week-tracker";

export const Home = () => {
  const { toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme("light");

  return (
    <Stack align="stretch" mih="100vh">
      {/* Top nav bar with theme toggle and account access */}
      <Box className={classes.topbar} pos="sticky" top={0}>
        <SimpleGrid cols={3} p="xs">
          <ActionIcon size="md" variant="transparent" title="Color scheme toggle" onClick={() => toggleColorScheme()}>
            {colorScheme === "dark" ? <IconSun stroke={1} /> : <IconMoon stroke={1} />}
          </ActionIcon>
          <Text ta="center">verve</Text>
          <ActionIcon ml="auto" size="md">
            <IconSettings stroke={1} />
          </ActionIcon>
        </SimpleGrid>
      </Box>

      <Stack px="sm" mb="lg" style={{ flexGrow: 1 }}>
        {/* Focus areas section */}
        <FocusAreas />

        {/* Week tracker */}
        <WeekTracker />

        {/* Today's exercises */}
        <Divider w="90%" mx="auto" />

        <Today />

        {/* Floating action button to add new exercise */}
        <LogFAB />
      </Stack>
    </Stack>
  );
};
