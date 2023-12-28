import { Flex, Badge, Group, Chip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import classes from "./circuits.module.css";

import { useScrollIntoView } from "@mantine/hooks";
import { ExerciseSelection } from "../functions";

export type CircuitsProps = {
  selections: ExerciseSelection[][];
  currCircuit: number;
  setCurrCircuit: (value: string | string[]) => void;
};

export const Circuits = ({ selections, currCircuit, setCurrCircuit }: CircuitsProps) => {
  // console.log("CIRCUITS");
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<HTMLDivElement, HTMLDivElement>({
    axis: "x",
    duration: 800,
  });

  const canAddNewCircuit = selections.length === 1 || selections[selections.length - 1].length > 0;

  return (
    <Flex className={classes.circuitsContainer} ref={scrollableRef} gap={6} px="xs" py={6} align="center">
      <Badge
        component="button"
        size={currCircuit === 0 ? "lg" : "md"}
        color="teal"
        variant={currCircuit === 0 ? "filled" : "outline"}
        onClick={() => setCurrCircuit("0")}
      >
        Normal {selections[0] && `(${selections[0].length})`}
      </Badge>
      {
        // For every array within the array of selections after index 1, add a badge for that array
        selections.slice(1).map((selection, i) => (
          <Badge
            key={i}
            component="button"
            onClick={() => setCurrCircuit((i + 1).toString())}
            size={currCircuit === i + 1 ? "lg" : "md"}
            color="blue"
            variant={currCircuit === i + 1 ? "filled" : "outline"}
          >
            Circuit {i + 1} ({selection.length})
          </Badge>
        ))
      }
      <Badge
        // @ts-expect-error - `ref` is not a valid prop for `Badge` but this still works
        ref={targetRef}
        component="button"
        disabled={!canAddNewCircuit}
        color={!canAddNewCircuit ? "gray" : ""}
        onClick={() => {
          setCurrCircuit(selections.length.toString());
          scrollIntoView({ alignment: "center" });
        }}
        size={currCircuit === selections.length ? "lg" : "md"}
        variant={currCircuit === selections.length ? "filled" : "outline"}
      >
        <Group gap={5} align="center">
          {currCircuit < selections.length && <IconPlus width={14} />}
          {currCircuit === selections.length && "New"} Circuit
        </Group>
      </Badge>
    </Flex>
  );
};
