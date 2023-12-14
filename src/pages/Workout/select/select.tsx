import useUserExercises from "@/hooks/userExercises.hook";
import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Badge,
  BadgeProps,
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  Group,
  Loader,
  Menu,
  Paper,
  Stack,
  Switch,
  Text,
  TextInput,
  createPolymorphicComponent,
} from "@mantine/core";
import { useState } from "react";
import classes from "./select.module.css";
import { useNavigate } from "react-router-dom";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useScrollIntoView } from "@mantine/hooks";
import { Exercises } from "./exercises";

export type SelectProps = {
  onCancelWorkout: () => void;
  onStartExercise: () => void;
};

export const Select = ({ onCancelWorkout, onStartExercise }: SelectProps) => {
  const navigate = useNavigate();
  const { status, data: userExercises, api } = useUserExercises();
  const [query, setQuery] = useState("");
  const [filterOption, setFilterOption] = useState<"filter" | "sort" | undefined>(undefined);
  const [selections, setSelections] = useState<string[][]>([[]]);
  const [currGroup, setCurrGroup] = useState(0);
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<HTMLDivElement, HTMLDivElement>({
    axis: "x",
    duration: 800,
  });

  const filteredExercises = userExercises.filter(
    (ex) => query === "" || ex.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSelections = selections.map((selection) =>
    selection.filter((id) => id.toLowerCase().includes(query.toLowerCase()))
  );

  const onChangeExercise = (id: string, checked: boolean) => {
    setSelections((prev) => {
      const newSelections = [...prev];

      if (checked) {
        newSelections[currGroup] = [...newSelections[currGroup], id];
      } else {
        newSelections[currGroup] = newSelections[currGroup].filter((n) => n !== id);
      }
      return newSelections;
    });
  };

  const onChangeAllExercises = (checked: boolean) => {
    setSelections((prev) => {
      const newSelections = [...prev];

      if (checked) {
        newSelections[currGroup] = filteredExercises.map(({ id, name }) => `${name}-${id}`);
      } else {
        newSelections[currGroup] = [];
      }
      return newSelections;
    });
  };

  const navigateToExerciseForm = () => {
    navigate(`/exercise-form${query ? `?name=${query}` : ""}`, { state: { prevPath: "/workout/select" } });
  };

  return (
    <Stack className={classes.select} h="100%" gap={0}>
      {/* Search section */}
      <Flex align="center" gap="xs" w="100%" py="xs" px="xs">
        <TextInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          variant="unstyled"
          placeholder="Search or create..."
          styles={{ root: { flexGrow: 1 } }}
        />
        <ActionIcon size="lg" radius="sm" variant="light" color="teal" onClick={navigateToExerciseForm}>
          <Icon icon="mdi:plus" />
        </ActionIcon>
        <ActionIcon
          size="lg"
          radius="sm"
          variant={filterOption === "filter" ? "filled" : "light"}
          color="blue"
          onClick={() => setFilterOption((prev) => (prev === "filter" ? undefined : "filter"))}
        >
          <Icon icon="mdi:filter-outline" />
        </ActionIcon>
        <ActionIcon
          size="lg"
          radius="sm"
          variant={filterOption === "sort" ? "filled" : "light"}
          color="blue"
          onClick={() => setFilterOption((prev) => (prev === "sort" ? undefined : "sort"))}
        >
          <Icon icon="iconoir:sort" />
        </ActionIcon>
        <ActionIcon
          size="lg"
          radius="sm"
          variant="light"
          color="pink"
          disabled={query === ""}
          onClick={() => {
            setQuery("");
            setFilterOption(undefined);
          }}
        >
          <Icon icon="iwwa:reset" />
        </ActionIcon>
      </Flex>

      <Divider />

      {/* Circuit section */}
      <Flex className={classes.circuitsContainer} ref={scrollableRef} gap={6} px="xs" py={6} align="center">
        <Badge
          component="button"
          size={currGroup === 0 ? "lg" : "md"}
          color="teal"
          variant={currGroup === 0 ? "filled" : "outline"}
          onClick={() => setCurrGroup(0)}
        >
          Normal {selections[0] && `(${selections[0].length})`}
        </Badge>
        {
          // For every array within the array of selections after index 1, add a badge for that array
          selections.slice(1).map((selection, i) => (
            <Badge
              key={i}
              component="button"
              onClick={() => setCurrGroup(i + 1)}
              size={currGroup === i + 1 ? "lg" : "md"}
              color="blue"
              variant={currGroup === i + 1 ? "filled" : "outline"}
            >
              Circuit {i + 1} ({selection.length})
            </Badge>
          ))
        }
        <Badge
          // @ts-expect-error - `ref` is not a valid prop for `Badge` but this still works
          ref={targetRef}
          component="button"
          onClick={() => {
            const prevLength = selections.length;
            setSelections((prev) => [...prev, []]);
            setCurrGroup(prevLength);
            scrollIntoView({ alignment: "center" });
          }}
          size="md"
          variant="light"
        >
          <Group gap={5} align="center">
            <IconPlus width={14} />
            Circuit
          </Group>
        </Badge>
      </Flex>

      <Divider mx="xs" />

      {/* List section */}
      {status !== "success" && (
        <Center p="xs" pt="md">
          {status === "loading" ? <Loader variant="" /> : <Text>An error occurred. Try again.</Text>}
        </Center>
      )}

      {status === "success" && (
        <Box className={classes.scroll} p="xs">
          <Exercises
            exercises={filteredExercises}
            total={userExercises.length}
            selections={filteredSelections}
            currGroup={currGroup}
            onChange={onChangeExercise}
            onChangeAll={onChangeAllExercises}
          />
        </Box>
      )}

      {/* Bottom control section */}
      <Box display={currGroup === 0 ? "none" : ""} mt="auto" px="xs">
        <Divider />
        <Center py={6}>
          <Button
            size="compact-sm"
            color="pink"
            onClick={() => {
              setSelections((prev) => prev.filter((_, index) => index !== currGroup));

              if (currGroup === selections.length - 1) {
                setCurrGroup(currGroup - 1);
              }
            }}
          >
            Remove Circuit
          </Button>
        </Center>
      </Box>

      <Divider mt={currGroup === 0 ? "auto" : ""} />
      <Group w="100%" pt="sm" pb="md" px="xs" align="center" justify="space-between" grow>
        <Button size="sm" variant="light" color="red" onClick={onCancelWorkout}>
          Cancel Workout
        </Button>
        <Button size="sm" color="blue.5" onClick={() => navigate(`/workout/exercise/${"pushup"}`)}>
          Start Exercises
        </Button>
      </Group>
    </Stack>
  );
};
