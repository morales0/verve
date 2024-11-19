import { ActionIcon, Button, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconMenu, IconPlus, IconRobotFace } from "@tabler/icons-react";

export const Home = () => {
  return (
    <Stack pos="relative" mih="100%" align="center" p="xs">
      <Paper p="xs" withBorder pos="sticky" top={0} style={{ alignSelf: "stretch" }}>
        <SimpleGrid cols={3}>
          <ActionIcon>
            <IconMenu />
          </ActionIcon>
          <Text ta="center">verve</Text>
          <ActionIcon ml="auto">
            <IconRobotFace />
          </ActionIcon>
        </SimpleGrid>
      </Paper>

      <ActionIcon pos="absolute" bottom={20} radius="xl" size="xl">
        <IconPlus />
      </ActionIcon>
    </Stack>
  );
};
