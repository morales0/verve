import { Button, Group, ScrollArea, Stack, Title } from "@mantine/core";

type Props = {
  name: string;
  sets: object[];
};

const ExerciseScreen = ({ name, sets }: Props) => {
  return (
    <Stack h="100%" py="lg" sx={{ overflow: "hidden" }}>
      <Title order={3}>{name}</Title>
      <ScrollArea sx={{ flexGrow: 1 }}>exercise form</ScrollArea>
      <Group w="100%" align={"center"} position="center" grow mt={"auto"}>
        <Button variant="outline" color="red">
          Cancel
        </Button>
        <Button variant="light" color="green">
          Create
        </Button>
      </Group>
    </Stack>
  );
};

export default ExerciseScreen;
