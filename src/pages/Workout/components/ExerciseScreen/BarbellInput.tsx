import { Icon } from "@iconify/react";
import {
  Center,
  UnstyledButton,
  Group,
  Text,
  ActionIcon,
  Box,
  NumberInput,
  NumberInputHandlers,
  Stack,
  Collapse,
  Paper,
} from "@mantine/core";
import { useRef, useState } from "react";

const WEIGHTS = [10, 25, 35, 45, 2.5, 5, 20];

type BarbellInputProps = {
  weights: Record<string, number>;
  onWeightsChange: (weight: string, newValue: number) => void;
};

const BarbellInput = ({ weights, onWeightsChange }: BarbellInputProps) => {
  const [open, setOpen] = useState(false);

  const plates: number[] = Object.entries(weights)
    .filter(([w, val]) => w !== "bar")
    .reduce<number[]>((arr, [plate, count]) => {
      const plateArr: number[] = [];
      for (let i = 0; i < count / 2; i++) {
        plateArr.push(parseFloat(plate));
      }

      return [...arr, ...plateArr];
    }, [])
    .sort((a, b) => a - b);

  return (
    <Stack>
      <Center>
        <UnstyledButton onClick={() => setOpen((o) => !o)}>
          <Group position="center" spacing={0} align="center" noWrap py="1rem">
            {plates.map((weight, i) => (
              <Plate key={`left-weight-${weight}-${i}`} weight={weight} />
            ))}
            <Bar weight={weights.bar ?? 45} empty={plates.length === 0} open={open} />
            {plates.reverse().map((weight, i) => (
              <Plate key={`left-weight-${weight}-${i}`} weight={weight} />
            ))}
          </Group>
        </UnstyledButton>
      </Center>

      <Collapse in={open} pb="lg">
        <Paper
          withBorder
          p="sm"
          shadow="lg"
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[2] : theme.colors.gray[9],
          })}
        >
          <Group position="apart">
            {WEIGHTS.map((weight, i) => (
              <PlateInput
                key={`plate-input-${i}-${weight}`}
                weight={weight}
                val={weights[weight] ?? 0}
                onChange={(newVal) => onWeightsChange(weight.toString(), newVal)}
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

export default BarbellInput;
