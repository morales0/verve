import { Icon } from "@iconify/react";
import { ActionIcon, Flex, Stack, Text, UnstyledButton } from "@mantine/core";
import { forwardRef } from "react";
import classes from "./exercise-switch.module.css";
import { ExerciseTitle } from "../exercise-title";

interface ExerciseSwitchProps extends React.ComponentPropsWithoutRef<"button"> {
  exercise: string;
  group: number;
}

export const ExerciseSwitch = forwardRef<HTMLButtonElement, ExerciseSwitchProps>(
  ({ exercise, group, ...others }: ExerciseSwitchProps, ref) => (
    <UnstyledButton ref={ref} {...others} className={classes.exerciseSwitch}>
      <Flex gap="xs" align="flex-end">
        <ActionIcon component="div" variant="light" size="sm">
          <Icon icon="icon-park-outline:switch" />
        </ActionIcon>
        <Stack gap={0}>
          {group > 0 && (
            <Text c="dimmed" fz="xs">
              Circuit {group}
            </Text>
          )}
          <ExerciseTitle name={exercise} />
        </Stack>
      </Flex>
    </UnstyledButton>
  )
);

ExerciseSwitch.displayName = "ExerciseSwitch";
