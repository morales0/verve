import { ActionIcon, Box, SegmentedControl, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconArrowLeft, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { List } from "./list";
import classes from "./log.module.css";
import { Summary } from "./summary";
import { DateSelect } from "./date-select";

export const ActiveLog = () => {
  const [view, setView] = useState("list");

  return (
    <Stack className={classes.logScreen} gap="xs" mih="100vh">
      <Box className={classes.topbar} pos="sticky" top={0}>
        <SimpleGrid cols={3} p="xs">
          <ActionIcon size="md" variant="transparent" component={Link} to="/">
            <IconArrowLeft stroke={1} />
          </ActionIcon>
          <Text ta="center" tt="uppercase" size="sm" fw={500} my="auto">
            New Log
          </Text>
          <ActionIcon size="md" variant="transparent" ml="auto">
            <IconTrash stroke={1} />
          </ActionIcon>
        </SimpleGrid>
      </Box>
      <Stack p="xs" pt={0}>
        <DateSelect />
        <SegmentedControl
          value={view}
          onChange={setView}
          data={[
            { value: "list", label: "Exercises" },
            { value: "summary", label: "Summary" },
          ]}
          color="teal"
        />
        {view === "list" && <List />}
        {view === "summary" && <Summary />}
      </Stack>
    </Stack>
  );
};
