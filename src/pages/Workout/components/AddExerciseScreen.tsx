import {
  Button,
  Group,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import useDatabaseList from "../../../hooks/databaseList.hook";
import { STATUS } from "../../../types/util";
import { UserExercise } from "../../../types/workout";
import NewExerciseForm from "./NewExerciseForm";

type Props = {
  addExercise: (ex: UserExercise) => void;
};

const AddExerciseScreen = ({ addExercise }: Props) => {
  const {
    status,
    data: userExercises,
    api,
  } = useDatabaseList<UserExercise>("userExercises");
  const [data, setData] = useState<UserExercise[]>([]);
  const [tab, setTab] = useState("adding");

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      setData(userExercises);
    }
  }, [status, userExercises]);

  const createExercise = async (data: UserExercise) => {
    return api.addChild(data, data.name);
  };

  if (status === STATUS.LOADING) {
    return <Text italic>Loading your exercises...</Text>;
  }

  const Header = () => {
    return (
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Name</th>
          <th style={{ textAlign: "center" }}>Type</th>
          <th style={{ textAlign: "center" }}>Muscle Groups</th>
        </tr>
      </thead>
    );
  };

  const Body = () => {
    return (
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={3} style={{ textAlign: "center" }}>
              <Text>Found no exercises. Make a new one up there!</Text>
            </td>
          </tr>
        ) : (
          data.map((ex, i) => (
            <tr
              key={`ex-info-${ex.name}-${i}`}
              style={{ cursor: "pointer" }}
              onClick={() => addExercise(ex)}
            >
              <td>{ex.name}</td>
              <td style={{ textAlign: "center" }}>
                {ex.type || (
                  <Text color="dimmed" fz="sm" italic>
                    None specified
                  </Text>
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {ex.muscleGroups ? (
                  <Text>{Object.values(ex.muscleGroups).toString()}</Text>
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
        <NewExerciseForm
          cancel={() => setTab("adding")}
          createExercise={createExercise}
        />
      ) : (
        <Stack h="100%" py="lg" sx={{ overflow: "hidden" }}>
          <Group align="flex-start">
            <TextInput placeholder="Search" sx={{ flexGrow: 1 }} />
            <Button
              color="teal"
              sx={{ flexGrow: 0 }}
              onClick={() => setTab("creating")}
            >
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
