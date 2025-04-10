import { ActionIcon, ActionIconProps, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export const ThemeToggle = (props: ActionIconProps) => {
  const { toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme("light");

  return (
    <ActionIcon
      size="md"
      variant="transparent"
      {...props}
      title="Color scheme toggle"
      onClick={() => toggleColorScheme()}
    >
      {colorScheme === "dark" ? <IconSun stroke={1} /> : <IconMoon stroke={1} />}
    </ActionIcon>
  );
};
