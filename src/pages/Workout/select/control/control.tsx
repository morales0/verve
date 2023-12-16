export const Control = () => {
  return (
    <>
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
        <Button size="sm" variant="light" color="red">
          Cancel Workout
        </Button>
        <Button size="sm" color="blue.5" loading={isStartingExercises} onClick={handleStartExercises}>
          Start Exercises
        </Button>
      </Group>
    </>
  );
};
