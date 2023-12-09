import { Button, Divider, Flex, Group, Menu, SegmentedControl, Stack, Text, UnstyledButton } from "@mantine/core";
import { forwardRef } from "react";
import { Icon } from "@iconify/react";

const data = [
  { value: "bench-press", label: "Bench press" },
  { value: "deadlift", label: "Deadlift" },
];

interface ExerciseSwitchProps extends React.ComponentPropsWithoutRef<"button"> {
  exercise: string;
}

const ExerciseSwitch = forwardRef<HTMLButtonElement, ExerciseSwitchProps>(
  ({ exercise, ...others }: ExerciseSwitchProps, ref) => (
    <UnstyledButton ref={ref} {...others}>
      <Group spacing="xs" align="center">
        <Text fz="xl" weight={500}>
          {exercise}
        </Text>

        <Icon icon="icon-park-outline:switch" />
      </Group>
    </UnstyledButton>
  )
);

ExerciseSwitch.displayName = "ExerciseSwitch";

export type ExercisesProps = {
  onRemove: () => void;
  onFinish: () => void;
};

export const Exercises = ({ onRemove, onFinish }: ExercisesProps) => {
  return (
    <Stack px="xs" pb="xs" spacing={0} h="100%" sx={{ overflow: "hidden" }}>
      <Flex justify="space-between" align="center" py={6}>
        <Menu position="bottom-end">
          <Menu.Target>
            <ExerciseSwitch exercise={data[0].label} />
          </Menu.Target>
          <Menu.Dropdown>
            {data.map((item) => (
              <Menu.Item key={item.value}>{item.label}</Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
        <SegmentedControl
          data={[
            { label: "Sets", value: "sets" },
            { label: "History", value: "history" },
          ]}
        />
      </Flex>

      <Divider />

      <Divider mt="auto" />
      <Group w="100%" py="md" px="xs" align="center" position="apart" grow>
        <Button size="sm" variant="light" color="red" onClick={onRemove}>
          Remove
        </Button>
        <Button size="sm" color="teal" onClick={onFinish}>
          Finish
        </Button>
      </Group>
    </Stack>
  );
};
