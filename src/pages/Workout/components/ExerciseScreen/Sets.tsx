import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Box,
  Center,
  Collapse,
  Group,
  NumberInput,
  NumberInputHandlers,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";

type Props = {
  sets: object[];
  weightType: string | undefined;
  onChange: (index: number, unit: string, value: number) => void;
};

const Sets = ({ sets, weightType, onChange }: Props) => {
  return (
    <>
      {sets.map((set, i) => {
        const updateSet = (unit: string, value: number) => onChange(i, unit, value);

        if (weightType === "Barbell") {
          return <BarbellSet key={`set-${i}`} set={set} onChange={updateSet} />;
        } else {
          return (
            <Group key={`set-${i}`} sx={{ justifyContent: "space-evenly" }} align="center">
              {Object.entries(set).map(([unit, val], j) => (
                <NumberInput
                  key={`set-${unit}-${j}`}
                  label={unit}
                  labelProps={{ sx: { fontStyle: "italic", color: "#bbb", fontSize: ".7rem" } }}
                  hideControls
                  value={val}
                  onChange={(newVal) => updateSet(unit, newVal || 0)}
                  min={0}
                  styles={{ input: { width: 60, height: 60, textAlign: "center", fontSize: "1.4rem" } }}
                />
              ))}
            </Group>
          );
        }
      })}
    </>
  );
};

const BarbellSet = ({ set, onChange }: { set: object; onChange: (unit: string, value: number) => void }) => {
  const [open, setOpen] = useState(false);
  const [plateCount, setPlateCount] = useState<Record<string, number>>({
    "2.5": 0,
    "5": 0,
    "10": 0,
    "20": 0,
    "25": 0,
    "35": 0,
    "45": 0,
  });
  const [bar, setBar] = useState<number>(45);
  const plateInputs = useRef<Record<number, NumberInputHandlers | null | undefined>>({});

  const plates: number[] = Object.entries(plateCount)
    .reduce<number[]>((arr, [plate, count]) => {
      const plateArr: number[] = [];
      for (let i = 0; i < count / 2; i++) {
        plateArr.push(parseFloat(plate));
      }

      return [...arr, ...plateArr];
    }, [])
    .sort((a, b) => a - b);

  const weights = [2.5, 5, 10, 20, 25, 35, 45];

  useEffect(() => {
    onChange(
      "Weight",
      plates.reduce<number>((sum, weight) => sum + weight * 2, bar)
    );
  }, [plateCount, bar]);

  const Bar = ({ weight }: { weight: number }) => (
    <Box
      component={Center}
      h="10px"
      w="80px"
      sx={() => ({
        position: "relative",
        backgroundColor: "#2b2a2a",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderLeft: plates.length === 0 ? "1px solid" : "none",
        borderRight: plates.length === 0 ? "1px solid" : "none",
        borderColor: "gray",
        margin: "1rem 0",
      })}
    >
      <Text fz="xs" fw="bold" color="dimmed" sx={{ position: "absolute", bottom: "12px" }}>
        {weight}
      </Text>
      <Icon
        icon="material-symbols:keyboard-arrow-down-rounded"
        width="30px"
        height="30px"
        style={{
          position: "absolute",
          top: "8px",
        }}
      />
    </Box>
  );

  const Plate = ({ weight }: { weight: number }) => (
    <Box
      h={`${weight <= 20 ? "30" : weight * 1.6}px`}
      w="20px"
      sx={() => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid",
        borderColor: "gray",
        borderRadius: "5px",
      })}
    >
      <Text fz="xs" fw="bold" color="dimmed">
        {weight}
      </Text>
    </Box>
  );

  return (
    <Stack align="stretch" spacing="md" mb="md">
      <Group sx={{ justifyContent: "space-evenly" }} align="center">
        {Object.entries(set).map(([unit, val], j) => (
          <NumberInput
            key={`set-${unit}-${j}`}
            label={unit}
            labelProps={{ sx: { fontStyle: "italic", color: "#bbb", fontSize: ".7rem" } }}
            hideControls
            value={val}
            onChange={(newVal) => onChange(unit, newVal || 0)}
            min={0}
            styles={{ input: { width: 60, height: 60, textAlign: "center", fontSize: "1.4rem" } }}
          />
        ))}
      </Group>

      <Center>
        <UnstyledButton onClick={() => setOpen((o) => !o)}>
          <Group position="center" spacing={0} align="center" noWrap py="1rem">
            {plates.map((weight, i) => (
              <Plate key={`left-weight-${weight}-${i}`} weight={weight} />
            ))}
            <Bar weight={bar} />
            {plates.reverse().map((weight, i) => (
              <Plate key={`left-weight-${weight}-${i}`} weight={weight} />
            ))}
          </Group>
        </UnstyledButton>
      </Center>

      <Collapse
        in={open}
        p="sm"
        pb="lg"
        sx={() => ({
          borderBottom: "1px solid #444",
        })}
      >
        <Group position="apart">
          {weights.map((val, i) => (
            <Stack align="center" key={`input-plate-${val}`}>
              <Group spacing={8}>
                <ActionIcon size={30} variant="default" onClick={() => plateInputs.current[val]?.decrement()}>
                  –
                </ActionIcon>
                <NumberInput
                  value={plateCount[val.toString()]}
                  onChange={(newVal) => setPlateCount((currCount) => ({ ...currCount, [val.toString()]: newVal || 0 }))}
                  handlersRef={(ref) => (plateInputs.current[val] = ref)}
                  hideControls
                  min={0}
                  step={2}
                  styles={{ input: { width: 65, height: 65, textAlign: "center", borderRadius: "50%" } }}
                />
                <ActionIcon size={30} variant="default" onClick={() => plateInputs.current[val]?.increment()}>
                  +
                </ActionIcon>
              </Group>
              <Text>{val}</Text>
            </Stack>
          ))}
        </Group>
      </Collapse>
    </Stack>
  );
};

export default Sets;
