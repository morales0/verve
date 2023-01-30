import { ScrollArea, Stack, Title } from "@mantine/core";

type Props = {};

const CompletedExercises = (props: Props) => {
  return (
    <Stack h="100%" sx={{ overflow: "hidden" }}>
      <ScrollArea>
        <Title>Filler</Title>
        <Title>Filler</Title>
      </ScrollArea>
    </Stack>
  );
};

export default CompletedExercises;
