import { Button, Center } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./home.module.css";

export const LogFAB = () => {
  return (
    <Center pos="sticky" bottom="var(--mantine-spacing-lg)" mx="auto" mt="auto">
      <Button
        className={classes.fabLog}
        component={Link}
        to="/active_log"
        radius="xl"
        fz="sm"
        size="compact-lg"
        variant="filled"
        rightSection={<IconPlus size={20} />}
        tt="uppercase"
        c="white"
        color="teal"
      >
        Log
      </Button>
      <Button
        className={classes.fabLog}
        component={Link}
        to="/active_log"
        radius="xl"
        fz="sm"
        size="compact-lg"
        variant="filled"
        rightSection={<IconPlus size={20} />}
        tt="uppercase"
        c="white"
        color="teal"
      >
        Quick
      </Button>
    </Center>
  );
};
