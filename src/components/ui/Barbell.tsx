import { Box, Center, Flex, Group, Text, rgba } from "@mantine/core";
import { PlateSide } from "./PlateSide";

export const Bar = ({ weight }: { weight: number }) => {
  return (
    <Center
      w={120}
      miw={25}
      style={(theme) => ({
        flexShrink: 1,
        height: 17,
        backgroundColor: rgba(theme.colors.gray[4], 0.75),
        border: `1px solid`,
        borderColor: theme.colors.gray[5],
      })}
    >
      <Text fw={500} fz="xs" color="gray.7">
        {weight}
      </Text>
    </Center>
  );
};
const Collar = () => {
  return (
    <Box
      w={12}
      miw={5}
      style={(theme) => ({
        flexShrink: 1,
        height: 17,
        backgroundColor: rgba(theme.colors.gray[4], 0.75),
        border: `1px solid`,
        borderColor: theme.colors.gray[5],
      })}
    />
  );
};

export type BarbellProps = { plates: number[]; bar: number };
export const Barbell = ({ plates, bar }: BarbellProps) => {
  return (
    <Group
      justify="flex-start"
      m="auto"
      px="xs"
      gap={2}
      align="center"
      wrap="nowrap"
      py="1rem"
      style={{ overflowX: "auto" }}
    >
      <Collar />
      <Flex gap={0} align="center">
        {plates.map((weight, i) => (
          <PlateSide key={`left-weight-${weight}-${i}`} weight={weight} />
        ))}
      </Flex>
      <Bar weight={bar} />
      <Flex gap={0} align="center">
        {[...plates].reverse().map((weight, i) => (
          <PlateSide key={`left-weight-${weight}-${i}`} weight={weight} />
        ))}
      </Flex>
      <Collar />
    </Group>
  );
};
