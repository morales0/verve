import { Box, Text } from "@mantine/core";

type StatusBarProps = {
  timeStarted: string;
};

export function StatusBar({ timeStarted }: StatusBarProps) {
  return (
    <Box py="sm">
      <Text color="dimmed" size="xs" italic weight="bold">
        Started: {timeStarted}
      </Text>
    </Box>
  );
}
