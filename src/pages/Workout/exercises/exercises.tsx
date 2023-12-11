import { Button, Divider, Flex, Group, Menu, SegmentedControl, Stack, Text, UnstyledButton } from "@mantine/core";
import { forwardRef } from "react";
import { Icon } from "@iconify/react";
import classes from "./exercises.module.css";
import { useNavigate, useParams } from "react-router-dom";

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
      <Group gap="xs" align="center">
        <Icon icon="icon-park-outline:switch" />
        <Text fz="xl" fw={500}>
          {exercise}
        </Text>
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
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Stack className={classes.exercises} px="xs" gap={0} h="100%">
      <Flex justify="space-between" align="center" py={6}>
        <Menu position="bottom-start">
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
      <Group w="100%" pt="sm" pb="md" px="xs" align="center" justify="space-between" grow>
        <Button size="sm" color="teal" onClick={() => navigate("/workout/summary")}>
          Go to Summary
        </Button>
      </Group>
    </Stack>
  );
};
