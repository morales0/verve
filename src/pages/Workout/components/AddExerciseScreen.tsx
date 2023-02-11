import { Button, Group, ScrollArea, Stack, Table, Text, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import useDatabaseList from "../../../hooks/databaseList.hook";
import useUserExercises from "../../../hooks/userExercises.hook";
import { STATUS } from "../../../types/util";
import { UserExercise } from "../../../types/workout";
import ExerciseForm from "./ExerciseForm";

type Props = {
  onAdd: (ex: UserExercise) => void;
  currentExerciseIds: string[] | undefined;
};

const AddExerciseScreen = ({ onAdd, currentExerciseIds }: Props) => {
  const { status, data: userExercises, api } = useUserExercises();
  const [data, setData] = useState<UserExercise[]>([]);
  const [tab, setTab] = useState("adding");
  // const [editData, setEditData] = useState<UserExercise | null>(null);
  // const largeScreen = useMediaQuery("(min-width: 900px)");

  const filteredData = data.filter((ex) => !currentExerciseIds?.includes(ex.id || ""));

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      console.log(userExercises);

      setData(userExercises);
    }
  }, [status, userExercises]);

  const createExercise = async (data: UserExercise) => {
    console.log(data);

    return api.addChild(data);
  };

  if (status === STATUS.LOADING) {
    return <Text italic>Loading your exercises...</Text>;
  }

  const Header = () => {
    return (
      <thead>
        <tr>
          <th style={{ width: "60%" }}>Name</th>
          <th style={{ textAlign: "center" }}>Primary Muscle Groups</th>
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
          data.map((ex, i) => (
            <tr key={`ex-info-${ex.name}-${i}`} style={{ cursor: "pointer" }} onClick={() => onAdd(ex)}>
              <td>
                {ex.name}{" "}
                <Text fz="xs" color="dimmed" italic>
                  {ex.weightType}
                </Text>
              </td>
              <td style={{ textAlign: "center" }}>
                {ex.primaryMuscleGroups ? (
                  <Text>{Object.values(ex.primaryMuscleGroups).toString()}</Text>
                ) : (
                  <Text color="dimmed" fz="sm" italic>
                    None specified
                  </Text>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    );
  };

  return (
    <>
      {tab === "creating" ? (
        <ExerciseForm cancel={() => setTab("adding")} submitExercise={createExercise} />
      ) : (
        <Stack h="100%" py="lg" sx={{ overflow: "hidden" }}>
          <Group align="flex-start">
            <TextInput placeholder="Search" sx={{ flexGrow: 1 }} />
            <Button color="teal" sx={{ flexGrow: 0 }} onClick={() => setTab("creating")}>
              + New Exercise
            </Button>
          </Group>

          <Text color="dimmed" italic fz="sm">
            Click on row to start exercise
          </Text>

          <ScrollArea>
            <Table highlightOnHover>
              <Header />
              <Body />
            </Table>
          </ScrollArea>
        </Stack>
      )}
    </>
  );
};

export default AddExerciseScreen;
