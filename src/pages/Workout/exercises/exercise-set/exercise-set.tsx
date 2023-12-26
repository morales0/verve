import { ActionIcon, Box, Flex, NumberInput, NumberInputHandlers, Paper, Text, TextInput } from "@mantine/core";
import React, { useRef } from "react";
import { ExerciseSet as ExerciseSetType, UserExercise } from "@/types/workout";
import { IconX } from "@tabler/icons-react";
import classes from "./exercise-set.module.css";

export type ExerciseSetProps = ExerciseSetType & {
  num: number;
  type: UserExercise["type"];
  updateSet: (updates: Partial<ExerciseSetType>) => void;
  removeSet: () => void;
  isLastSet: boolean;
};

export const ExerciseSet = ({ values, weights, type, num, updateSet, removeSet, isLastSet }: ExerciseSetProps) => {
  const onUnitChange = (unit: string, newValue: string | number) =>
    updateSet({
      values: {
        ...values,
        [unit]: newValue,
      },
    });

  return (
    <Box>
      <Paper withBorder pos="relative" py="xs">
        <Flex justify="space-evenly" direction="row" align="center">
          {Object.entries(values).map(([unit, value], j) =>
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
        <Text pos="absolute" bottom={4} right={0} px="xs" color="dimmed" fw={600} fs="italic" fz="lg">
          {num}
        </Text>
      </Paper>

      {/* {type === "Barbell" && <BarbellInput weights={weights ?? {}} onWeightsChange={() => {}} />} */}

      {/* {type === "Dumbbell"(<DumbbellInput weights={weights ?? {}} onWeightsChange={() => {}} />)} */}
    </Box>
  );
};

type NumberSetInputProps = {
  unit: string;
  value: number;
  onUnitChange: (unit: string, newValue: number) => void;
};

const NumberSetInput = ({ unit, value, onUnitChange }: NumberSetInputProps) => {
  const handlers = useRef<NumberInputHandlers>();

  const isDecimal = unit !== "Reps";

  return (
    <Flex direction="column" align="center">
      <NumberInput
        variant="unstyled"
        classNames={{ label: classes.numberInputLabel }}
        styles={{
          input: { width: unit === "Weight" ? 110 : 80, height: 70, textAlign: "center", fontSize: "1.7rem" },
        }}
        label={unit}
        value={value}
        onChange={(newValue) => {
          onUnitChange(unit, Number(newValue) || 0);
        }}
        allowNegative={false}
        min={0}
        allowDecimal={isDecimal}
        decimalScale={isDecimal ? 1 : 0}
        step={isDecimal ? 0.5 : 1}
        hideControls
        handlersRef={handlers}
        onFocus={(event) => event.target.select()}
        inputMode={isDecimal ? "decimal" : "numeric"}
      />
      <Flex direction="row" gap="xs">
        <ActionIcon size={30} variant="light" color="teal" onClick={() => handlers.current?.decrement()}>
          –
        </ActionIcon>
        <ActionIcon size={30} variant="light" color="teal" onClick={() => handlers.current?.increment()}>
          +
        </ActionIcon>
      </Flex>
    </Flex>
  );
};
