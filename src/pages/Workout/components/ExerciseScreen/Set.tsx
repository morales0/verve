import { ActionIcon, Box, Flex, NumberInput, NumberInputHandlers, TextInput } from "@mantine/core";
import { useRef } from "react";
import { SetType } from "../../../../types/workout";

type Props = {
  set: SetType;
  onUnitChange: (unit: string, newValue: string | number) => void;
};

const Set = ({ set, onUnitChange }: Props) => {
  return (
    <Flex justify="space-evenly" direction="row" align="center">
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
    </Flex>
  );
};

type NumberSetInputProps = {
  unit: string;
  value: number;
  onUnitChange: (unit: string, newValue: number) => void;
};

const NumberSetInput = ({ unit, value, onUnitChange }: NumberSetInputProps) => {
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Box>
      <NumberInput
        styles={{ input: { width: 60, height: 60, textAlign: "center", fontSize: "1.4rem" } }}
        label={unit}
        labelProps={{ sx: { fontStyle: "italic", color: "#bbb", fontSize: ".7rem" } }}
        value={value}
        onChange={(newValue) => {
          onUnitChange(unit, newValue || 0);
        }}
        min={0}
        hideControls
        handlersRef={handlers}
      />
      <Flex direction="row">
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
