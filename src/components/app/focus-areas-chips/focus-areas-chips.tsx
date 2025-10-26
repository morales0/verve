import { useFocusAreas } from "@/api";
import { Chip, ChipGroupProps, Group, Stack, Text } from "@mantine/core";

export type FocusAreasChipsProps = ChipGroupProps<true>;

export const FocusAreaChips = (props: FocusAreasChipsProps) => {
  const { data } = useFocusAreas({ select: (data) => Object.values(data).filter(({ archived }) => archived) });

  return (
    <Stack gap="xs">
      <Text size="sm" fw={500}>
        Select Focus Areas
      </Text>
      <Group wrap="wrap" gap="xs" justify="space-evenly">
        <Chip.Group multiple {...props}>
          {data?.map(({ id, name }) => (
            <Chip key={id} value={id}>
              {name}
            </Chip>
          ))}
        </Chip.Group>
      </Group>
    </Stack>
  );
};
