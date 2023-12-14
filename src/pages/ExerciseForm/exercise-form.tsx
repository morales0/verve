import { ActionIcon, Box, Divider, Flex, Paper, Stack, Text, TextInput, rem } from "@mantine/core";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import cx from "clsx";
import appClasses from "@/styles/app.module.css";
import { IconBarbell } from "@tabler/icons-react";
import { Icon } from "@iconify/react";

export type ExerciseFormProps = {
  startingName?: string;
  callback?: () => void;
};

export const ExerciseForm = ({ startingName, callback }: ExerciseFormProps) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const location = useLocation();

  return (
    <Stack className={cx(appClasses.heightLocked)} gap={0}>
      <Text fw="500" styles={{ root: { alignSelf: "center" } }}>
        Exercise Form
      </Text>
      <Box p="xs">
        <TextInput variant="unstyled" size="xl" defaultValue={searchParams[0].get("name") ?? ""} />
        <Divider color="indigo" />
        <Text fz="xs" mt={rem(6)}>
          Name
        </Text>
      </Box>

      <Box className={cx(appClasses.scrollable)} p="xs">
        <Text fw={500} mb="xs">
          Choose type:
        </Text>
        <Stack gap="xs" w={190} styles={{ root: { alignSelf: "start" } }}>
          <Paper px="sm" py={rem(8)} withBorder>
            <Flex align="center" gap="lg">
              <Icon width={40} icon="ion:barbell" />
              <Stack gap={0}>
                <Text fz="lg" fw={500}>
                  Barbell
                </Text>
                <Text fz="xs" c="dimmed">
                  Reps + Weight
                </Text>
              </Stack>
            </Flex>
          </Paper>
          <Paper px="sm" py={rem(8)} withBorder>
            <Flex align="center" gap="sm">
              <Icon width={40} icon="solar:dumbbell-bold-duotone" />
              <Stack gap={0}>
                <Text fz="lg" fw={500}>
                  Dumbbell
                </Text>
                <Text fz="xs" c="dimmed">
                  Reps + Weight
                </Text>
              </Stack>
            </Flex>
          </Paper>
          <Paper px="sm" py={rem(8)} withBorder>
            <Flex align="center" gap="sm">
              <Icon width={40} icon="solar:stopwatch-broken" />
              <Stack gap={0}>
                <Text fz="lg" fw={500}>
                  Timed
                </Text>
                <Text fz="xs" c="dimmed">
                  Timer
                </Text>
              </Stack>
            </Flex>
          </Paper>
        </Stack>
      </Box>

      <Divider mt="auto" />
      <Box>
        <Flex align="center" justify="center" gap="sm" pt="xs" pb="md" px="xs">
          <ActionIcon radius="xl">
            <Icon icon="icon-park-outline:return" />
          </ActionIcon>

          <ActionIcon radius="xl" color="green">
            <Icon icon="material-symbols-light:check" />
          </ActionIcon>
        </Flex>
      </Box>
    </Stack>
  );
};
