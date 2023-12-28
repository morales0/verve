import { Barbell } from "@/components/ui";
import { decodeKey, encodeKey } from "@/functions/utils";
import { Carousel } from "@mantine/carousel";
import {
  ActionIcon,
  Box,
  Center,
  Drawer,
  Group,
  NumberInput,
  NumberInputHandlers,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useRef } from "react";

const WEIGHTS = [2.5, 5, 10, 20, 25, 35, 45];

const reduceToPlates = (weights: Record<string, number>) =>
  Object.entries(weights)
    .filter(([w, _]) => w !== "bar")
    .reduce<number[]>((arr, [plate, count]) => {
      const plateArr: number[] = [];
      for (let i = 0; i < count / 2; i++) {
        plateArr.push(parseFloat(decodeKey(plate)));
      }

      return [...arr, ...plateArr];
    }, [])
    .sort((a, b) => a - b);

export type BarbellInputProps = {
  weights: Record<string, number>;
  onWeightsChange: (weight: string, newValue: number) => void;
};

export const BarbellInput = ({ weights, onWeightsChange }: BarbellInputProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const plates = useMemo(() => reduceToPlates(weights), [weights]);

  return (
    <>
      <Drawer opened={opened} onClose={close} withCloseButton={false} position="bottom" size="70%" trapFocus={false}>
        <Stack mt="lg" gap="lg">
          <Stack align="center" gap="xs">
            <Center maw="100%" mih={110}>
              <Barbell plates={plates} bar={weights["bar"] ?? 0} />
            </Center>
            <NumberInput
              label="Bar"
              variant="filled"
              styles={{
                input: { width: 60, textAlign: "center", fontSize: "1.2rem" },
                label: {
                  fontStyle: "italic",
                  color: "#afafaf",
                  fontSize: ".7rem",
                  width: "100%",
                  textAlign: "center",
                },
              }}
              value={weights["bar"] ?? 0}
              onChange={(value) => onWeightsChange("bar", value === undefined ? 0 : Number(value))}
              min={0}
              max={99}
              hideControls
              onFocus={(event) => event.target.select()}
            />
          </Stack>

          <Stack align="center" gap="lg">
            <Text fs="italic" fw={500} fz="sm" c="#afafaf">
              Plates
            </Text>
            <Carousel w="100%" controlsOffset={0} loop slideSize="50%" align="start" slidesToScroll={2}>
              {WEIGHTS.map((weight) => (
                <Carousel.Slide key={weight}>
                  <PlateInputSlide
                    weight={weight}
                    value={weights[encodeKey(weight.toString())] ?? 0}
                    onChange={(value) => onWeightsChange(encodeKey(weight.toString()), value === undefined ? 0 : value)}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Stack>
        </Stack>
      </Drawer>

      <Center>
        <UnstyledButton onClick={open} maw="100%">
          <Center maw="100%">
            <Barbell plates={plates} bar={weights["bar"] ?? 0} />
          </Center>
        </UnstyledButton>
      </Center>
    </>
  );
};

type PlateInputSlideProps = {
  weight: number;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
};
const PlateInputSlide = ({ weight, value, onChange }: PlateInputSlideProps) => {
  return (
    <Center
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Box
        style={(theme) => ({
          width: "140px",
          height: "140px",
          textAlign: "center",
          borderRadius: "50%",
          color: theme.colors.gray[7],
          backgroundColor: theme.colors.gray[4],
          border: `2px solid ${theme.colors.gray[6]}`,
        })}
      >
        <Center h="100%">
          <Box
            w={20}
            h={20}
            style={(theme) => ({
              borderRadius: "50%",
              backgroundColor: theme.colors.gray[8],
              border: "2px solid",
              borderColor: theme.colors.gray[6],
            })}
          ></Box>
          <Text pos="absolute" top={10} fw={500}>
            {weight}{" "}
            <Text c="dimmed" fz="xs">
              x2
            </Text>
          </Text>
          <Box pos="absolute" bottom={10}>
            <PlateCountInput value={value} onChange={onChange} />
          </Box>
        </Center>
      </Box>
    </Center>
  );
};

type PlateCountInputProps = Pick<PlateInputSlideProps, "value" | "onChange">;
const PlateCountInput = ({ value, onChange }: PlateCountInputProps) => {
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Group gap={5} align="center">
      <ActionIcon size={35} variant="filled" onClick={() => handlers.current?.decrement()}>
        –
      </ActionIcon>

      <NumberInput
        readOnly
        variant="unstyled"
        hideControls
        value={value ? value / 2 : 0}
        onChange={(val) => onChange(val ? Number(val) * 2 : 0)}
        handlersRef={handlers}
        max={9}
        min={0}
        step={1}
        styles={{ input: { color: "black", width: 30, textAlign: "center", fontSize: "1.4rem" } }}
      />

      <ActionIcon size={35} variant="filled" onClick={() => handlers.current?.increment()}>
        +
      </ActionIcon>
    </Group>
  );
};

export default BarbellInput;
