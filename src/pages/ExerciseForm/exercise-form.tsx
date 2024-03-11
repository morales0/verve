import { ActionIcon, Box, Chip, Divider, Flex, Paper, SimpleGrid, Stack, Text, TextInput, rem } from "@mantine/core";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import cx from "clsx";
import appClasses from "@/styles/app.module.css";
import classes from "./exercise-form.module.css";
import { IconBarbell, IconPlus } from "@tabler/icons-react";
import { Icon } from "@iconify/react";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import useMuscleGroups from "@/hooks/muscleGroups.hook";
import useUserExercises from "@/hooks/userExercises.hook";
import { UserExercise } from "@/types/workout";

export const mockTypeData = [
  { name: "Barbell", icon: "ion:barbell", units: ["Reps", "Weight"] },
  { name: "Dumbbell", icon: "solar:dumbbell-bold-duotone", units: ["Reps", "Weight"] },
  { name: "Timed", icon: "solar:stopwatch-broken", units: ["Time"] },
  { name: "Bodyweight", icon: "healthicons:body", units: ["Reps"] },
  { name: "Kettlebell", icon: "mdi:kettlebell", units: ["Reps", "Weight"] },
  { name: "Elliptical", icon: "healthicons:exercise-bicycle-outline", units: ["Distance"] },
  { name: "Cable", icon: "openmoji:cable", units: ["Reps", "Weight"] },
];

export type ExerciseFormValues = {
  name: string;
  type: string;
  units: string[];
  primaryMuscleGroups: string[];
  secondaryMuscleGroups: string[];
};

export const ExerciseForm = () => {
  const { data, api: muscleApi } = useMuscleGroups();
  const location = useLocation();
  const navigate = useNavigate();
  const { api } = useUserExercises();

  const [page, setPage] = useState(0);
  const [newGroup, setNewGroup] = useState<string>("");

  const exercise: Partial<UserExercise> = location.state?.exercise ?? {};

  const form = useForm<ExerciseFormValues>({
    initialValues: {
      name: exercise.name ?? "",
      type: exercise.type ?? "",
      units: [...(exercise.units ?? [])],
      primaryMuscleGroups: [...(exercise.primaryMuscleGroups ?? [])],
      secondaryMuscleGroups: [...(exercise.secondaryMuscleGroups ?? [])],
    },
  });

  const okayToContinue =
    form.values.name !== "" &&
    ((page === 0 && form.values.type && form.values.units.length !== 0) ||
      (page === 1 && form.values.primaryMuscleGroups.length > 0) ||
      page === 2);

  const completeForm = async () => {
    if (exercise.id) {
      api.updateChild(exercise.id, form.values).then((key) => {
        if (location.state["prevPath"]) {
          navigate(location.state["prevPath"], {
            state: {
              exerciseId: key,
              name: form.values.name,
            },
          });
        }
      });
    } else {
      api.addChild(form.values).then((key) => {
        if (location.state["prevPath"]) {
          navigate(location.state["prevPath"], {
            state: {
              exerciseId: key,
              name: form.values.name,
            },
          });
        }
      });
    }
  };

  const handleNewGroupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newGroup === "") return;
    if (data.find((group) => group.name === newGroup)) return;

    muscleApi.addMuscleGroup(newGroup);
    setNewGroup("");
  };

  if (!exercise) return null;

  return (
    <Stack className={cx(appClasses.heightLocked)} gap={0}>
      <Text fw="500" styles={{ root: { alignSelf: "center" } }}>
        Exercise Form
      </Text>

      <Box p="xs">
        <TextInput variant="unstyled" size="xl" {...form.getInputProps("name")} />
        <Divider color="indigo" />
        <Text fz="xs" mt={rem(6)}>
          Name
        </Text>
      </Box>

      <Box className={cx(appClasses.scrollable)} display={page === 0 ? "" : "none"} p="xs">
        <Text fw={500} mb="xs">
          Choose type:
        </Text>
        <Chip.Group
          // {...form.getInputProps("type", { type: "checkbox" })}
          value={form.values.type}
          onChange={(value) => {
            form.setFieldValue("type", value as string);
            form.setFieldValue("units", mockTypeData.find(({ name }) => name === value)?.units ?? []);
          }}
        >
          <SimpleGrid cols={2} spacing={rem(6)}>
            {mockTypeData.map(({ name, icon, units }) => (
              <Chip
                key={name}
                value={name}
                onChange={(checked) => {
                  console.log(name, checked);
                  form.setFieldValue("units", units);
                }}
                radius={0}
                variant="light"
                color="indigo"
                classNames={{
                  root: classes.chipRoot,
                  label: classes.chipLabel,
                  iconWrapper: classes.chipLabelCheckIcon,
                }}
              >
                {/* <Paper className={cx(classes.typePaper)} px="sm" py={rem(8)} withBorder> */}
                <Flex align="center" gap="xs">
                  <Icon className={classes.typeIcon} width={25} icon={icon} />
                  <Stack gap={0}>
                    <Text fz="md" fw={500}>
                      {name}
                    </Text>
                    <Text fz="xs" c="dimmed">
                      {units.join(" + ")}
                    </Text>
                  </Stack>
                </Flex>
                {/* </Paper> */}
              </Chip>
            ))}
            <Chip
              value="Custom"
              radius={0}
              variant={form.values.type === "Custom" ? "light" : "outline"}
              classNames={{
                root: classes.chipRoot,
                label: cx(classes.chipLabel, classes.customChip),
                iconWrapper: classes.chipLabelCheckIcon,
              }}
            >
              {/* <Paper className={cx(classes.typePaper, classes.customPaper)} px="sm" py={rem(8)} withBorder> */}
              <Flex align="center" gap="xs">
                <IconPlus className={classes.typeIcon} width={20} />

                <Stack gap={0}>
                  <Text fz="md" fw={500}>
                    Custom
                  </Text>
                  <Text fz="xs" c="dimmed">
                    Create your own
                  </Text>
                </Stack>
              </Flex>
              {/* </Paper> */}
            </Chip>
          </SimpleGrid>
        </Chip.Group>
        {form.values.type === "Custom" && (
          <>
            <Text fw={500} mb="xs">
              Choose units:
            </Text>
            <Chip.Group multiple {...form.getInputProps("units", { type: "checkbox" })} value={form.values.units}>
              <Flex gap="xs" align="center" wrap="wrap">
                {["Reps", "Weight", "Time", "Distance"].map((unit) => (
                  <Chip
                    key={unit}
                    value={unit}
                    // radius={0}
                    // variant="light"
                    color="indigo"
                    // classNames={{ label: classes.chipLabel, iconWrapper: classes.chipLabelCheckIcon }}
                  >
                    {unit}
                  </Chip>
                ))}
              </Flex>
            </Chip.Group>
          </>
        )}
      </Box>

      <Stack display={page === 1 ? "" : "none"} p="xs">
        <Text fw={500}>Choose primary muscle groups:</Text>
        <Chip.Group
          multiple
          {...form.getInputProps("primaryMuscleGroups", { type: "checkbox" })}
          value={form.values.primaryMuscleGroups}
        >
          <Flex gap="xs" align="center" wrap="wrap">
            {data.map((group) => (
              <Chip
                key={group.name}
                value={group.name}
                // radius={0}
                // variant="light"
                color="indigo"
                // classNames={{ label: classes.chipLabel, iconWrapper: classes.chipLabelCheckIcon }}
              >
                {group.name}
              </Chip>
            ))}
          </Flex>
        </Chip.Group>
        <form onSubmit={handleNewGroupSubmit}>
          <TextInput
            value={newGroup}
            onChange={(event) => setNewGroup(event.target.value)}
            placeholder="Create new group"
            radius="xl"
            w={160}
            styles={{ input: { textAlign: "center" } }}
          />
        </form>
      </Stack>

      <Box display={page === 2 ? "" : "none"} p="xs">
        <Text fw={500} mb="xs">
          Choose secondary muscle groups:
        </Text>
        <Text fz="xs">Optional</Text>
        <Chip.Group
          multiple
          {...form.getInputProps("secondaryMuscleGroups", { type: "checkbox" })}
          value={form.values.secondaryMuscleGroups}
        >
          <Flex gap="xs" align="center" wrap="wrap">
            {data.map((group) => (
              <Chip
                key={group.name}
                value={group.name}
                // radius={0}
                // variant="light"
                color="indigo"
                // classNames={{ label: classes.chipLabel, iconWrapper: classes.chipLabelCheckIcon }}
              >
                {group.name}
              </Chip>
            ))}
          </Flex>
        </Chip.Group>
      </Box>

      {page === 3 && (
        <Box p="xs">
          <Flex gap="xs">
            <Text fw={500}>Type:</Text>
            <Text>{form.values.type}</Text>
          </Flex>
          <Flex gap="xs">
            <Text fw={500}>Units:</Text>
            <Text>{form.values.units.join(", ")}</Text>
          </Flex>
          <Flex gap="xs">
            <Text fw={500}>Primary:</Text>
            <Text>{form.values.primaryMuscleGroups.join(", ")}</Text>
          </Flex>
          <Flex gap="xs">
            <Text fw={500}>Secondary:</Text>
            <Text>{form.values.secondaryMuscleGroups.join(", ")}</Text>
          </Flex>
        </Box>
      )}

      <Divider mt="auto" />
      <Box>
        <Flex align="center" justify="center" gap="sm" pt="xs" pb="md" px="xs">
          <ActionIcon
            radius="xl"
            size="lg"
            color="cyan"
            disabled={page === 0}
            onClick={() => {
              setPage((prev) => prev - 1);
              // form.setValues(form.values);
            }}
          >
            <Icon icon="icon-park-outline:return" />
          </ActionIcon>

          {page < 3 ? (
            <ActionIcon
              radius="xl"
              size="lg"
              color="blue"
              disabled={!okayToContinue}
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
            >
              <Icon icon="material-symbols-light:check" />
            </ActionIcon>
          ) : (
            <ActionIcon size="lg" radius="xl" color="green" onClick={() => completeForm()}>
              <Icon icon="formkit:submit" />
            </ActionIcon>
          )}
        </Flex>
      </Box>
    </Stack>
  );
};
