import { useFocusAreas } from "@/context";
import { Stack, Group, Chip, Text, ChipGroupProps } from "@mantine/core";

export type FocusAreasChipsProps = ChipGroupProps<true>;

export const FocusAreaChips = (props: FocusAreasChipsProps) => {
  const { data } = useFocusAreas();

  const userFocusAreas = data.filter(({ archived }) => !archived);

  return (
    <Stack gap="xs">
      <Text size="sm" fw={500}>
        Select Focus Areas
      </Text>
      <Group wrap="wrap" gap="xs" justify="space-evenly">
        <Chip.Group multiple {...props}>
          {userFocusAreas.map(({ id, name }) => (
            <Chip key={id} value={id}>
              {name}
            </Chip>
          ))}
        </Chip.Group>
      </Group>
    </Stack>
  );
};
