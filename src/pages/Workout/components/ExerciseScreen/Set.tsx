import { ActionIcon, Box, Flex, NumberInput, NumberInputHandlers, Paper, Text, TextInput } from "@mantine/core";
import React, { useRef } from "react";
import { SetType } from "../../../../types/workout";
import { IconX } from "@tabler/icons-react";

type Props = {
  num: number;
  set: SetType;
  onUnitChange: (unit: string, newValue: string | number) => void;
  removeSet: () => any;
  isLastSet: boolean;
};

const Set = ({ num, set, onUnitChange, removeSet, isLastSet }: Props) => {
  return (
    <Paper
      withBorder
      component={Flex}
      pos="relative"
      justify="space-evenly"
      direction="row"
      align="center"
      py="xs"
      sx={(theme) => ({
        flexGrow: 1,
        // border: `1px solid`,
        // borderRadius: theme.radius.sm,
        // borderColor: theme.colorScheme === "dark" ? theme.colors.gray[7] : theme.colors.gray[2],
        // backgroundColor: theme.colorScheme === "dark" ? theme.colors.gray[9] : theme.white,
        // boxShadow: `0 0 3px 0 #00000022`,
      })}
    >
      {Object.entries(set.values).map(([unit, value], j) =>
        typeof value === "number" ? (
          <NumberSetInput key={`set-${unit}-${j}`} unit={unit} value={value} onUnitChange={onUnitChange} />
        ) : (
          <TextInput
            key={`set-${unit}-${j}`}
            styles={{ input: { width: 60, height: 60, textAlign: "center", fontSize: "1.4rem" } }}
            label={unit}
            labelProps={{ sx: { fontStyle: "italic", color: "#bbb", fontSize: ".7rem" } }}
            value={value}
            onChange={(e) => onUnitChange(unit, e.currentTarget.value)}
          />
        )
      )}
      {isLastSet && (
        <ActionIcon
          onClick={removeSet}
          pos="absolute"
          top={-5}
          right={-5}
          color="pink.7"
          size="sm"
          radius="sm"
          variant="filled"
        >
          <IconX size=".75rem" />
        </ActionIcon>
      )}
      <Text pos="absolute" bottom={2} right={0} px="xs" color="dimmed" fw={600} italic fz="lg">
        {num}
      </Text>
    </Paper>
  );
};

type NumberSetInputProps = {
  unit: string;
  value: number;
  onUnitChange: (unit: string, newValue: number) => void;
};

const NumberSetInput = ({ unit, value, onUnitChange }: NumberSetInputProps) => {
  const handlers = useRef<NumberInputHandlers>();

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => event.target.select();

  const isDecimal = unit !== "Reps";

  return (
    <Box>
      <NumberInput
        variant="unstyled"
        styles={{ input: { width: 80, height: 80, textAlign: "center", fontSize: "1.7rem" } }}
        label={unit}
        labelProps={{
          sx: { fontStyle: "italic", color: "#afafaf", fontSize: ".7rem", width: "100%", textAlign: "center" },
        }}
        value={value}
        onChange={(newValue) => {
          onUnitChange(unit, newValue || 0);
        }}
        min={0}
        precision={isDecimal ? 1 : 0}
        step={0.5}
        hideControls
        handlersRef={handlers}
        onFocus={handleFocus}
      />
      <Flex direction="row" w="100%" justify="space-around">
        <ActionIcon
          size={30}
          variant="light"
          onClick={() => {
            handlers.current?.decrement();
          }}
        >
          –
        </ActionIcon>
        <ActionIcon size={30} variant="light" onClick={() => handlers.current?.increment()}>
          +
        </ActionIcon>
      </Flex>
    </Box>
  );
};

export default Set;
