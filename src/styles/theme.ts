import classes from "@/styles/app.module.css";
import { ActionIcon, Button, Checkbox, Paper, createTheme } from "@mantine/core";
import cx from "clsx";

export const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: (_theme, params) => ({
        root: cx({ [classes.lightButton]: params.variant === "light" }),
      }),
    }),

    Button: Button.extend({
      classNames: (_theme, params) => ({
        root: cx({ [classes.lightButton]: params.variant === "light" }),
      }),
    }),

    Paper: Paper.extend({
      classNames: (_theme, params) => ({
        root: cx(classes.paper),
      }),
    }),
    Checkbox: Checkbox.extend({
      classNames: (_theme, params) => ({
        root: cx(classes.checkbox),
      }),
    }),
  },
});
