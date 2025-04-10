import { SegmentedControl, SegmentedControlProps, Stack, Text } from "@mantine/core";

export const EffortSelect = (props: Omit<SegmentedControlProps, "data">) => (
  <Stack gap="xs">
    <Text size="sm" fw={500}>
      Level of Effort
    </Text>
    <SegmentedControl
      color="teal"
      withItemsBorders={false}
      {...props}
      data={[
        { value: "1", label: "Light" },
        { value: "2", label: "Moderate" },
        { value: "3", label: "High" },
      ]}
    />
  </Stack>
);
