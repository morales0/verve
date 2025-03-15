import { ActionIcon, Box, SegmentedControl, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconArrowLeft, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { List } from "./list";
import classes from "./log.module.css";
import { Summary } from "./summary";

export const Log = () => {
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
        <SegmentedControl
          bg="#171425"
          value={view}
          onChange={setView}
          size="xs"
          fullWidth
          radius="xs"
          color="teal"
          data={[
            { value: "list", label: "Exercises" },
            { value: "summary", label: "Summary" },
          ]}
        />
        {/* Focus areas */}
        {/* <FocusAreas /> */}

        {/* Tabs for list of exercises and summary screen */}

        {/* Screens */}
        {view === "list" && <List />}
        {view === "summary" && <Summary />}
        {view === "exercise" && <Box />}
      </Stack>

      {/* <SimpleGrid cols={2} spacing={0} pos="sticky" bottom={0} mt="auto" className={classes.control}>
        <UnstyledButton className={classes.viewButton} data-active={view === "list"} onClick={() => setView("list")}>
          <Center p="xs">Exercises</Center>
        </UnstyledButton>
        <UnstyledButton
          className={classes.viewButton}
          data-active={view === "summary"}
          onClick={() => setView("summary")}
        >
          <Center p="xs">Summary</Center>
        </UnstyledButton>
      </SimpleGrid> */}
    </Stack>
  );
};
