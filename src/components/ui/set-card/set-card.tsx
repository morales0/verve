import { ActionIcon, NumberInput, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";

export type SetCardProps = {
  type: string;
  name: string;
  value: string | number;
  onChange: (val: string | number) => void;
  onRemove: () => void;
};
// TODO: Render components based on type, i.e. TimeInput for time, TextInput for text, etc...
// TODO: Need to implement weights if type is weights, can offer barbell, dumbbell, kettle bell, etc...
export const SetCard = ({ name, type, value, onChange, onRemove }: SetCardProps) => {
  const inc = () => onChange(Number(value) + 1);
  const dec = () => onChange(value === 0 ? 0 : Number(value) - 1);
  return (
    <Paper pos="relative" withBorder radius="md" p={0}>
      <ActionIcon pos="absolute" onClick={onRemove} top={-6} right={-6} radius="xl" variant="filled" color="pink">
        <IconX size={16} stroke={2} />
      </ActionIcon>
      <Stack gap={0}>
        <Text mx="auto" my="xs" size="sm">
          {name}
        </Text>
        <NumberInput
          value={value}
          onChange={onChange}
          hideControls
          variant="unstyled"
          placeholder="0"
          styles={{
            input: {
              width: 120,
              textAlign: "center",
              fontSize: "1.7rem",
            },
          }}
          min={0}
          allowDecimal
          step={0.5}
        />
        <SimpleGrid cols={2} spacing={0}>
          <ActionIcon onClick={dec} w="100%" size="xl" color="green" variant="transparent">
            <IconMinus />
          </ActionIcon>
          <ActionIcon onClick={inc} w="100%" size="xl" color="green" variant="transparent">
            <IconPlus />
          </ActionIcon>
        </SimpleGrid>
      </Stack>
    </Paper>
  );
};
