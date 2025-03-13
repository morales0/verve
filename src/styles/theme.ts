import classes from "@/styles/app.module.css";
import { ActionIcon, Badge, Button, Checkbox, Divider, Paper, createTheme } from "@mantine/core";
import cx from "clsx";

export const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: (_theme, params) => ({
        root: cx({ [classes.lightButton]: params.variant === "light" }),
      }),
    }),

    Badge: Badge.extend({
      defaultProps: {
        radius: "sm",
      },
    }),

    Button: Button.extend({
      classNames: (_theme, params) => ({
        root: cx({ [classes.lightButton]: params.variant === "light" }),
      }),
    }),

    Divider: Divider.extend({
      classNames: (_theme, params) => ({
        root: cx(classes.divider),
      }),
    }),

    Paper: Paper.extend({
      classNames: (_theme, params) => ({
        root: cx(classes.paper),
      }),
    }),
    Checkbox: Checkbox.extend({
      classNames: (_theme, params) => ({
        input: cx(classes.checkbox),
      }),
    }),
  },
});
