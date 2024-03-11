import { CSSVariablesResolver } from "@mantine/core";

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--mantine-color-body": theme.white,
    "--mantine-color-text": theme.colors.dark[7],
  },
  dark: {
    "--mantine-color-body": theme.colors.dark[7],
    "--mantine-color-text": theme.white,
  },
});
