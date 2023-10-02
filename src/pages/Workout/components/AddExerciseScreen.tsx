import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Button,
  Center,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import useUserExercises from "../../../hooks/userExercises.hook";
import { STATUS } from "../../../types/util";
import { UserExercise } from "../../../types/workout";
import ExerciseForm from "./ExerciseForm";

type Props = {
  onStart: (ex: UserExercise) => void;
  onEdit: (ex: UserExercise) => void;
  onDelete: (ex: UserExercise) => void;
  onCreate: () => void;
  currentExerciseIds: string[] | undefined;
};

const AddExerciseScreen = ({ onStart, onEdit, onCreate, onDelete, currentExerciseIds }: Props) => {
  const theme = useMantineTheme();
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
      setData(userExercises);
    }
  }, [status, userExercises]);

  if (status === STATUS.LOADING) {
    return null;
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
          <th style={{ width: "100%" }}>Name</th>
          <th style={{ textAlign: "center", minWidth: "150px" }}>Muscle Groups</th>
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
          filteredData
            .sort((a, b) => (a.name < b.name ? -1 : a.name < b.name ? 1 : 0))
            .map((ex, i) => (
              <tr key={`ex-info-${ex.name}-${i}`}>
                <td style={{ cursor: "pointer" }} onClick={() => onStart(ex)}>
                  <Text fz="md">{ex.name}</Text>
                  <Text fz="xs" color="dimmed" italic>
                    {ex.weightType}
                  </Text>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Stack justify="center" spacing={0}>
                    {ex.primaryMuscleGroups && (
                      <Text size="sm">{Object.values(ex.primaryMuscleGroups).join(", ")}</Text>
                    )}
                    {ex.secondaryMuscleGroups && (
                      <Text color="dimmed" size="xs">
                        {Object.values(ex.secondaryMuscleGroups).join(", ")}
                      </Text>
                    )}
                  </Stack>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Group noWrap spacing="xs" position="center">
                    <ActionIcon color="indigo" variant="light" onClick={() => onEdit(ex)}>
                      <Icon icon="material-symbols:edit" />
                    </ActionIcon>
                    <ActionIcon color="red" variant="light" onClick={() => onDelete(ex)}>
                      <Icon icon="ic:baseline-delete-forever" />
                    </ActionIcon>
                  </Group>
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
          placeholder="Search by name"
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
        <Table
          sx={(theme) => ({
            "& td": { borderTopColor: theme.colorScheme === "dark" ? `${theme.colors.gray[7]}!important` : undefined },
          })}
        >
          <Header />
          <Body />
        </Table>
      </ScrollArea>
    </Stack>
  );
};

export default AddExerciseScreen;
