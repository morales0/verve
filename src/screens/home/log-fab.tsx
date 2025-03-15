import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./home.module.css";

export const LogFAB = () => {
  return (
    <Button
      className={classes.fabLog}
      component={Link}
      to="/log"
      pos="sticky"
      bottom="var(--mantine-spacing-lg)"
      ml="auto"
      mt="auto"
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
  );
};
