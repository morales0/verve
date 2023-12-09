import { Box, Center, Flex, Group, Text, createStyles } from "@mantine/core";
import { PlateSide } from "./PlateSide";

const useStyles = createStyles((theme) => ({
  bar: {
    height: 17,
    backgroundColor: theme.fn.rgba(theme.colors.gray[4], 0.75),
    border: `1px solid`,
    borderColor: theme.colors.gray[5],
  },
  collar: {},
}));

export const Bar = ({ weight }: { weight: number }) => {
  const { classes } = useStyles();

  return (
    <Center w={120} miw={25} sx={{ flexShrink: 1 }} className={classes.bar}>
      <Text fw={500} fz="xs" color="gray.7">
        {weight}
      </Text>
    </Center>
  );
};
const Collar = () => {
  const { classes } = useStyles();

  return <Box w={12} miw={5} sx={{ flexShrink: 1 }} className={classes.bar} />;
};

export type BarbellProps = { plates: number[]; bar: number };
export const Barbell = ({ plates, bar }: BarbellProps) => {
  return (
    <Group position="left" m="auto" px="xs" gap={2} align="center" noWrap py="1rem" sx={{ overflowX: "auto" }}>
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
