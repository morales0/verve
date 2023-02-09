import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Group,
  NumberInput,
  NumberInputHandlers,
  ScrollArea,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { WorkoutExercise } from "../../../types/workout";

type Props = {
  exercise: WorkoutExercise;
  onFinish: () => Promise<void>;
  onCancel: () => void;
  updateExercise: (updates: Partial<WorkoutExercise>) => void;
};

const ExerciseScreen = ({ exercise, onFinish, onCancel, updateExercise }: Props) => {
  const addSet = () => {
    updateExercise({
      sets: [
        ...exercise.sets,
        exercise.units.reduce<Record<string, number>>((obj, unit) => ((obj[unit] = 0), obj), {}),
      ],
    });
  };
  const removeSet = () => {
    updateExercise({
      sets: exercise.sets.slice(0, -1),
    });
  };
  const updateSetValue = (index: number, unit: string, value: number) => {
    updateExercise({
      sets: exercise.sets.map((set, i) => (i === index ? { ...set, [unit]: value } : set)),
    });
  };

  return (
    <Stack h="100%" sx={{ overflow: "hidden" }} align="flex-start" spacing={0}>
      <Group align="center" py="sm">
        <Title order={3}>{exercise.name}</Title>
        <Group>
          <Button variant="outline" color="gray" onClick={removeSet} size="xs">
            -
          </Button>
          <Button variant="outline" color="gray" onClick={addSet} size="xs">
            +
          </Button>
        </Group>
      </Group>
      {/* <Group px="lg">
        {exercise.units.map((unit) => (
          <Title key={`unit-${unit}`} order={4}>
            {unit}
          </Title>
        ))}
      </Group> */}
      <ScrollArea w="100%" pr="sm" sx={{ flexGrow: 1 }}>
        <Sets sets={exercise.sets} weightType={exercise.weightType} onChange={updateSetValue} />
      </ScrollArea>
      <Group w="100%" align={"center"} position="center" grow mt={"auto"}>
        <Button variant="outline" color="red" onClick={onCancel} size="xs">
          Cancel
        </Button>
        <Button variant="light" color="green" onClick={onFinish} size="xs">
          Finish
        </Button>
      </Group>
    </Stack>
  );
};

const Sets = ({
  sets,
  weightType,
  onChange,
}: {
  sets: object[];
  weightType: string | undefined;
  onChange: (index: number, unit: string, value: number) => void;
}) => {
  return (
    <>
      {sets.map((set, i) => {
        const updateSet = (unit: string, value: number) => onChange(i, unit, value);
        if (weightType === "Barbell") {
          return <BarbellSet key={`set-${i}`} set={set} onChange={updateSet} />;
        } else {
          return (
            <Group key={`set-${i}`}>
              {Object.entries(set).map(([unit, val], j) => (
                <Text key={`set-${unit}-${j}`}>
                  {unit}: {val}
                </Text>
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
      })}
    >
      <Text fz="xs" fw="bold" color="dimmed" sx={{ position: "relative", bottom: "15px" }}>
        {weight}
      </Text>
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
    <Stack>
      <Group position="left" align="center" spacing="lg">
        <Group>
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

        <UnstyledButton onClick={() => setOpen((o) => !o)}>
          <Group align="center" spacing={10}>
            <Group position="center" spacing={0} align="center">
              {plates.map((weight, i) => (
                <Plate key={`left-weight-${weight}-${i}`} weight={weight} />
              ))}
              <Bar weight={bar} />
              {plates.reverse().map((weight, i) => (
                <Plate key={`left-weight-${weight}-${i}`} weight={weight} />
              ))}
            </Group>
            <Icon icon="material-symbols:keyboard-arrow-down-rounded" width="30px" height="30px" />
          </Group>
        </UnstyledButton>
      </Group>

      <Collapse
        in={open}
        p="sm"
        pb="lg"
        maw="600px"
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

export default ExerciseScreen;
