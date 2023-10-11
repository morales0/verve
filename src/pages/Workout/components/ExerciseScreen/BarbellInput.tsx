import { Icon } from "@iconify/react";
import { Carousel } from "@mantine/carousel";
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
  Drawer,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRef, useState } from "react";
import { Bar } from "../../../../components/ui/Bar";
import { Barbell } from "../../../../components/ui/Barbell";

const WEIGHTS = [2.5, 5, 10, 20, 25, 35, 45];

type BarbellInputProps = {
  weights: Record<string, number>;
  onWeightsChange: (weight: string, newValue: number) => void;
};

const BarbellInput = ({ weights, onWeightsChange }: BarbellInputProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const plates: number[] = Object.entries(weights)
    .filter(([w, val]) => w !== "bar")
    .reduce<number[]>((arr, [plate, count]) => {
      const plateArr: number[] = [];
      for (let i = 0; i < count / 2; i++) {
        plateArr.push(parseFloat(plate));
      }

      return [...arr, ...plateArr];
    }, [])
    .sort((a, b) => b - a);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        position="bottom"
        size="60%"
        overlayOpacity={0.3}
        trapFocus={false}
      >
        <Stack mt="lg" spacing="lg">
          <Stack align="center" spacing="xs">
            <Center maw="100%" mih={110}>
              <Barbell plates={plates} bar={weights["bar"] ?? 0} />
            </Center>
            <NumberInput
              label="Bar"
              variant="filled"
              styles={{
                input: { width: 50, textAlign: "center", fontSize: "1.2rem" },
              }}
              labelProps={{
                sx: { fontStyle: "italic", color: "#afafaf", fontSize: ".7rem", width: "100%", textAlign: "center" },
              }}
              value={weights["bar"] ?? 0}
              onChange={(value) => onWeightsChange("bar", value === undefined ? 0 : value)}
              min={0}
              hideControls
              onFocus={(event) => event.target.select()}
            />
          </Stack>

          <Stack align="center" spacing="xs">
            <Text italic fw={500} fz="sm" color="#afafaf">
              Plates
            </Text>
            <Carousel w="100%" controlsOffset={80} loop>
              {WEIGHTS.map((weight) => (
                <Carousel.Slide key={weight}>
                  <PlateInputSlide
                    weight={weight}
                    value={weights[weight.toString()] ?? 0}
                    onChange={(value) => onWeightsChange(weight.toString(), value === undefined ? 0 : value)}
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
    <Center>
      <Box
        component={Center}
        sx={(theme) => ({
          width: "140px",
          height: "140px",
          textAlign: "center",
          borderRadius: "50%",
          color: theme.colors.gray[7],
          backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[4] : theme.colors.gray[4],
          border: `2px solid ${theme.colorScheme === "light" ? theme.colors.gray[5] : theme.colors.gray[6]}`,
        })}
      >
        <Box
          w={20}
          h={20}
          sx={(theme) => ({
            borderRadius: "50%",
            backgroundColor: theme.colorScheme === "light" ? "white" : theme.colors.gray[8],
            border: "2px solid",
            borderColor: theme.colors.gray[6],
          })}
        ></Box>
        <Text pos="absolute" top={10} fw={500}>
          {weight}{" "}
          <Text color="dimmed" fz="xs">
            x2
          </Text>
        </Text>
        <Box pos="absolute" bottom={10}>
          <PlateCountInput value={value} onChange={onChange} />
        </Box>
      </Box>
    </Center>
  );
};

type PlateCountInputProps = Pick<PlateInputSlideProps, "value" | "onChange">;
const PlateCountInput = ({ value, onChange }: PlateCountInputProps) => {
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Group spacing={5} align="center">
      <ActionIcon size={35} variant="filled" onClick={() => handlers.current?.decrement()}>
        –
      </ActionIcon>

      <NumberInput
        readOnly
        variant="unstyled"
        hideControls
        value={value ? value / 2 : 0}
        onChange={(val) => onChange(val ? val * 2 : 0)}
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
