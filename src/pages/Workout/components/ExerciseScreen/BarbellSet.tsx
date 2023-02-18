import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Box,
  Center,
  Collapse,
  Group,
  NumberInput,
  NumberInputHandlers,
  Paper,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";

const weights = [10, 25, 35, 45, 2.5, 5, 20];

type Props = {
  set: object;
  onUnitChange: (unit: string, value: number) => void;
};

const BarbellSet = ({ set, onUnitChange }: Props) => {
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

  const plates: number[] = Object.entries(plateCount)
    .reduce<number[]>((arr, [plate, count]) => {
      const plateArr: number[] = [];
      for (let i = 0; i < count / 2; i++) {
        plateArr.push(parseFloat(plate));
      }

      return [...arr, ...plateArr];
    }, [])
    .sort((a, b) => a - b);

  // Update exercise whenever user changes barbell values
  useEffect(() => {
    onUnitChange(
      "Weight",
      plates.reduce<number>((sum, weight) => sum + weight * 2, bar)
    );
  }, [plateCount, bar]);

  return (
    <Stack align="stretch" spacing="sm" mb="xs">
      <Group sx={{ justifyContent: "space-evenly" }} align="center">
        {Object.entries(set).map(([unit, val], j) => (
          <SetInput
            key={`set-input-${unit}-${j}`}
            unit={unit}
            val={val}
            onChange={(newVal) => onUnitChange(unit, newVal)}
          />
        ))}
      </Group>

      <Center>
        <UnstyledButton onClick={() => setOpen((o) => !o)}>
          <Group position="center" spacing={0} align="center" noWrap py="1rem">
            {plates.map((weight, i) => (
              <Plate key={`left-weight-${weight}-${i}`} weight={weight} />
            ))}
            <Bar weight={bar} empty={plates.length === 0} open={open} />
            {plates.reverse().map((weight, i) => (
              <Plate key={`left-weight-${weight}-${i}`} weight={weight} />
            ))}
          </Group>
        </UnstyledButton>
      </Center>

      <Collapse in={open} p="sm" pb="lg">
        <Paper
          withBorder
          p="sm"
          shadow="lg"
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[2] : theme.colors.gray[9],
          })}
        >
          <Group position="apart">
            {weights.map((weight, i) => (
              <PlateInput
                key={`plate-input-${i}-${weight}`}
                weight={weight}
                val={plateCount[weight]}
                onChange={(newVal) =>
                  setPlateCount((currPlateCount) => ({
                    ...currPlateCount,
                    [weight]: newVal,
                  }))
                }
              />
            ))}
          </Group>
        </Paper>
      </Collapse>
    </Stack>
  );
};

const Bar = ({ weight, empty, open }: { weight: number; empty?: boolean; open: boolean }) => (
  <Box
    component={Center}
    h="10px"
    w="80px"
    sx={(theme) => ({
      position: "relative",
      backgroundColor: theme.colors.gray[7],
      borderTop: "1px solid",
      borderBottom: "1px solid",
      borderLeft: empty ? "1px solid" : "none",
      borderRight: empty ? "1px solid" : "none",
      borderColor: theme.colors.gray[5],
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
        transform: open ? "rotate(180deg)" : "unset",
        color: "#444",
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

const PlateInput = ({ weight, val, onChange }: { weight: number; val: number; onChange: (newVal: number) => void }) => {
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Stack align="center" spacing="xs">
      <Box
        component={Center}
        sx={(theme) => ({
          width: "65px",
          height: "65px",
          textAlign: "center",
          borderRadius: "50%",
          color: theme.colors.gray[0],
          backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[5] : theme.colors.gray[8],
          border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[6] : theme.colors.gray[6]}`,
        })}
      >
        <Text>{weight}</Text>
      </Box>
      <Group align="center" spacing={8}>
        <ActionIcon size={30} variant="default" onClick={() => handlers.current?.decrement()}>
          –
        </ActionIcon>
        <NumberInput
          value={val}
          onChange={(newVal) => onChange(newVal || 0)}
          handlersRef={handlers}
          hideControls
          min={0}
          step={2}
          styles={{
            input: {
              textAlign: "center",
              width: "40px",
              marginBottom: "0!important",
            },
          }}
        />
        <ActionIcon size={30} variant="default" onClick={() => handlers.current?.increment()}>
          +
        </ActionIcon>
      </Group>
    </Stack>
  );
};

const SetInput = ({ unit, val, onChange }: { unit: string; val: number; onChange: (newVal: number) => void }) => {
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Group spacing={8}>
      <ActionIcon size={30} variant="default" onClick={() => handlers.current?.decrement()}>
        –
      </ActionIcon>
      <NumberInput
        label={unit}
        labelProps={{ sx: { fontStyle: "italic", color: "#bbb", fontSize: ".7rem" } }}
        hideControls
        value={Number.isNaN(val) ? undefined : val}
        onChange={(newVal) => onChange(newVal || 0)}
        handlersRef={handlers}
        min={0}
        styles={{ input: { width: 60, height: 60, textAlign: "center", fontSize: "1.4rem" } }}
      />
      <ActionIcon size={30} variant="default" onClick={() => handlers.current?.increment()}>
        +
      </ActionIcon>
    </Group>
  );
};

export default BarbellSet;
