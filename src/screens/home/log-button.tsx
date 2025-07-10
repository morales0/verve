import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./home.module.css";

export const LogButton = () => {
  return (
    <Button
      component={Link}
      className={classes.logBtn}
      rightSection={<IconPlus size={20} />}
      radius="xl"
      to="/active-log"
    >
      Log
    </Button>
  );
};
