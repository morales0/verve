import classes from "@/styles/app.module.css";
import { ActionIcon, Badge, Button, Checkbox, Chip, Divider, Loader, Paper, createTheme } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import cx from "clsx";

export const theme = createTheme({
  primaryColor: "teal",
  primaryShade: 7,
  defaultRadius: "sm",

  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: "subtle",
        color: "default",
        size: "sm",
      },
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

    Chip: Chip.extend({
      defaultProps: {
        radius: "sm",
      },
    }),

    DateInput: DateInput.extend({
      defaultProps: {
        firstDayOfWeek: 0,
        highlightToday: true,
      },
    }),

    Divider: Divider.extend({
      classNames: (_theme, params) => ({
        root: cx(classes.divider),
      }),
    }),

    Loader: Loader.extend({
      defaultProps: {
        type: "bars",
        size: "sm",
      },
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
