import { Group, NumberInput } from "@mantine/core";

type Props = {
  set: Record<string, number>;
  onUnitChange: (unit: string, newVal: number) => void;
};

const Set = ({ set, onUnitChange }: Props) => {
  return (
    <Group sx={{ justifyContent: "space-evenly" }} align="center">
      {Object.entries(set).map(([unit, val], j) => (
        <NumberInput
          key={`set-${unit}-${j}`}
          label={unit}
          labelProps={{ sx: { fontStyle: "italic", color: "#bbb", fontSize: ".7rem" } }}
          hideControls
          value={val}
          onChange={(newVal) => onUnitChange(unit, newVal || 0)}
          min={0}
          styles={{ input: { width: 60, height: 60, textAlign: "center", fontSize: "1.4rem" } }}
        />
      ))}
    </Group>
  );
};

export default Set;
