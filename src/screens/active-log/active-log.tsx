import { ActionIcon, Box, Flex, Stack } from "@mantine/core";
import { IconArrowLeft, IconTrash } from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";
import classes from "./log.module.css";
import { DateSelect } from "./date-select";

// TODO: Use top bar component for the navigation stuff here
export const ActiveLog = () => {
  return (
    <Stack className={classes.logScreen} gap="xs" mih="100vh">
      <Box className={classes.topbar} pos="sticky" top={0}>
        <Flex align="center" justify="center" p="xs">
          <ActionIcon size="md" variant="transparent" component={Link} to="/active-log">
            <IconArrowLeft stroke={1} />
          </ActionIcon>
          <DateSelect />
          <ActionIcon size="md" variant="transparent">
            <IconTrash stroke={1} />
          </ActionIcon>
        </Flex>
      </Box>
      <Stack p="xs" pt={0}>
        <Outlet />
      </Stack>
    </Stack>
  );
};
