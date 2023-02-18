import { Icon } from "@iconify/react";
import { ActionIcon, Button, Center, Divider, Group, ScrollArea, Stack, Table, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import useUserExercises from "../../../hooks/userExercises.hook";
import { STATUS } from "../../../types/util";
import { UserExercise } from "../../../types/workout";
import ExerciseForm from "./ExerciseForm";

type Props = {
  onStart: (ex: UserExercise) => void;
  onEdit: (ex: UserExercise) => void;
  onCreate: () => void;
  currentExerciseIds: string[] | undefined;
};

const AddExerciseScreen = ({ onStart, onEdit, onCreate, currentExerciseIds }: Props) => {
  const { status, data: userExercises, api } = useUserExercises();
  const [data, setData] = useState<UserExercise[]>([]);
  const [query, setQuery] = useState("");
  // const [editData, setEditData] = useState<UserExercise | null>(null);
  // const largeScreen = useMediaQuery("(min-width: 900px)");

  const filteredData = data.filter(
    (ex) =>
      !currentExerciseIds?.includes(ex.id || "") &&
      (query === "" || ex.name.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      console.log(userExercises);

      setData(userExercises);
    }
  }, [status, userExercises]);

  if (status === STATUS.LOADING) {
    return <Text italic>Loading your exercises...</Text>;
  }

  const Header = () => {
    return (
      <thead>
        <tr>
          <th colSpan={3} style={{ border: "none", paddingBottom: 0 }}>
            <Text color="dimmed" italic fz="sm" align="left" py="xs">
              Click on name to start exercise
            </Text>
          </th>
        </tr>
        <tr>
          <th style={{ width: "60%" }}>Name</th>
          <th style={{ textAlign: "center" }}>Muscle Groups</th>
          <th></th>
        </tr>
      </thead>
    );
  };

  const Body = () => {
    return (
      <tbody>
        {filteredData.length === 0 ? (
          <tr>
            <td colSpan={3} style={{ textAlign: "center" }}>
              <Text>Found no exercises. Make a new one up there!</Text>
            </td>
          </tr>
        ) : (
          filteredData.map((ex, i) => (
            <tr key={`ex-info-${ex.name}-${i}`}>
              <td style={{ cursor: "pointer" }} onClick={() => onStart(ex)}>
                {ex.name}{" "}
                <Text fz="xs" color="dimmed" italic>
                  {ex.weightType}
                </Text>
              </td>
              <td style={{ textAlign: "center" }}>
                <Stack justify="center" spacing={0}>
                  {ex.primaryMuscleGroups && <Text>{Object.values(ex.primaryMuscleGroups).join(", ")}</Text>}
                  {ex.secondaryMuscleGroups && (
                    <Text color="dimmed" size="xs">
                      {Object.values(ex.secondaryMuscleGroups).join(", ")}
                    </Text>
                  )}
                </Stack>
              </td>
              <td>
                <ActionIcon color="indigo" variant="light" onClick={() => onEdit(ex)}>
                  <Icon icon="material-symbols:edit" />
                </ActionIcon>
              </td>
            </tr>
          ))
        )}
      </tbody>
    );
  };

  return (
    <Stack h="100%" py="lg" sx={{ overflow: "hidden" }} spacing={0}>
      <Group align="flex-start" pb="sm">
        <TextInput
          placeholder="Search"
          sx={{ flexGrow: 1 }}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <Button color="teal" sx={{ flexGrow: 0 }} onClick={onCreate}>
          + New Exercise
        </Button>
      </Group>

      <Divider />

      <ScrollArea>
        <Table>
          <Header />
          <Body />
        </Table>
      </ScrollArea>
    </Stack>
  );
};

export default AddExerciseScreen;
