import {
  Button,
  Group,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";

type ExerciseInfo = {
  name: string;
  type?: string;
  musclegroups?: string;
};

const mockdata: ExerciseInfo[] = [
  {
    name: "Pushups",
    type: "Bodyweight",
    musclegroups: "Chest, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
  {
    name: "Pullups",
    type: "Bodyweight",
    musclegroups: "Lats, Arms",
  },
];

type Props = {
  addExercise: (name: string) => void;
};

const AddExerciseScreen = ({ addExercise }: Props) => {
  const [data, setData] = useState<ExerciseInfo[]>(mockdata);

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
        {data.map((ex, i) => (
          <tr key={`ex-info-${ex.name}-${i}`}>
            <td>{ex.name}</td>
            <td style={{ textAlign: "center" }}>
              {ex.type || (
                <Text color="dimmed" fz="sm" italic>
                  None specified
                </Text>
              )}
            </td>
            <td style={{ textAlign: "center" }}>
              {ex.musclegroups || (
                <Text color="dimmed" fz="sm" italic>
                  None specified
                </Text>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <Stack py="lg">
      <Group align="flex-start">
        <TextInput placeholder="Search" sx={{ flexGrow: 1 }} />
        <Button color="teal" sx={{ flexGrow: 0 }}>
          + New Exercise
        </Button>
      </Group>

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
