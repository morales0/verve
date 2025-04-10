import {
  ActionIcon,
  Box,
  Button,
  Center,
  Chip,
  Flex,
  Group,
  Modal,
  Paper,
  SegmentedControl,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import classes from "./log.module.css";
import { IconArrowLeft, IconDots, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { CustomValues, LogExercise, UserExercise } from "@/types/app.types";
import { useFocusAreas } from "@/context";

export const ActiveExercise = () => {
  const { logId } = useParams();
  const userFocusAreas = useFocusAreas();

  const [userExercise, setUserExercise] = useState<UserExercise | undefined>(undefined);
  const [logExercise, setLogExercise] = useState<LogExercise | undefined>(undefined);

  const [areas, setAreas] = useState<string[]>();
  const [metrics, setMetrics] = useState<CustomValues>({
    duration: {
      type: "time",
      label: "Duration",
      value: 500,
    },
    pigeonPoseDuration: {
      type: "time",
      label: "Pigeon Pose Time",
      value: 60,
    },
    instructor: {
      type: "string",
      label: "Instructor",
      value: "Yoga with Adrienne",
    },
    liked: {
      type: "string",
      label: "Liked",
      value: "Yes",
    },
  });
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Stack mih="100vh">
        <Box className={classes.topbar} pos="sticky" top={0}>
          <SimpleGrid cols={3} p="xs">
            <ActionIcon size="md" variant="transparent" component={Link} to="/active-log">
              <IconArrowLeft stroke={1} />
            </ActionIcon>
            <Text ta="center" tt="uppercase" size="sm" fw={500} my="auto">
              Logging Exercise
            </Text>
            <ActionIcon size="md" variant="transparent" ml="auto">
              <IconDots stroke={1} />
            </ActionIcon>
          </SimpleGrid>
        </Box>
        <Stack px="xs">
          <Stack gap="xs">
            <Text mx="auto">Select Focus Areas</Text>
            <Group wrap="wrap" gap="xs" justify="space-evenly">
              <Chip.Group multiple value={areas} onChange={setAreas}>
                {userFocusAreas.data.map(({ id, name }) => (
                  <Chip key={id} value={id}>
                    {name}
                  </Chip>
                ))}
              </Chip.Group>
            </Group>
          </Stack>

          <Stack>
            <Text mx="auto">Level of Effort</Text>
            <SegmentedControl
              color="teal"
              data={[
                { value: "1", label: "Light" },
                { value: "2", label: "Moderate" },
                { value: "3", label: "High" },
              ]}
            />
          </Stack>

          <Stack>
            <Text mx="auto">Add Metrics</Text>
            <SimpleGrid cols={2}>
              <Paper withBorder bg="transparent" component="button" onClick={open}>
                <Center h="100%">
                  <IconPlus />
                </Center>
              </Paper>
              {Object.entries(metrics).map(([key, { type, label, value }]) => (
                <Paper key={key} mih={100}>
                  <Flex direction="column" h="100%" align="center">
                    <Center px="xs" style={{ flexGrow: 4 }}>
                      <Text size={type === "number" || type === "time" ? "xl" : "md"} ta="center">
                        {value}
                      </Text>
                    </Center>
                    <Text size="xs" tt="uppercase" fw={500} pb="xs" px="xs">
                      {label}
                    </Text>
                  </Flex>
                </Paper>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>

        <Box pos="sticky" bottom={0} mt="auto" className={classes.control} bg="var(--bg-violet)">
          <Flex justify="space-evenly" p="sm">
            <Button color="pink" variant="light" size="compact-md">
              Delete
            </Button>
            <Button size="compact-md">Save</Button>
          </Flex>
        </Box>
      </Stack>
      <Modal opened={opened} onClose={close} title="New Metric" centered>
        <Stack>
          <TextInput label="Name" />
          <TextInput label="Value" />
          <Select label="Type" data={["Auto", "Time", "Number", "String"]} />
          <Button>Save Metric</Button>
        </Stack>
      </Modal>
    </>
  );
};
