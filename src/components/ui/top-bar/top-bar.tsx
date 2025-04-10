import { Box } from "@mantine/core";
import { PropsWithChildren } from "react";
import classes from "./top-bar.module.css";

export const TopBar = ({ children }: PropsWithChildren) => (
  <Box className={classes.root} pos="sticky" top={0}>
    {children}
  </Box>
);
