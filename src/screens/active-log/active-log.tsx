import { ActionIcon, Flex, Group, Stack } from "@mantine/core";
import { IconArrowLeft, IconChecklist, IconHome, IconListCheck } from "@tabler/icons-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import classes from "./log.module.css";
import { DateSelect } from "./date-select";
import { TopBar } from "@/components/ui";

export const ActiveLog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSummary = location.pathname === "/active-log/summary" || location.pathname === "/active-log/summary/";
  const isList = location.pathname === "/active-log" || location.pathname === "/active-log/";

  return (
    <Stack className={classes.logScreen} gap="xs" mih="100vh">
      <TopBar>
        <Flex align="center" justify="center" p="xs" gap="sm">
          <Group gap="xs">
            <ActionIcon size="md" variant="transparent" component={Link} to="/">
              <IconHome stroke={1} />
            </ActionIcon>

            <ActionIcon size="md" variant="transparent" onClick={() => navigate(-1)}>
              <IconArrowLeft stroke={1} />
            </ActionIcon>
          </Group>
          <DateSelect />
          {isSummary && (
            <ActionIcon size="md" variant="transparent" component={Link} to="/active-log">
              <IconListCheck stroke={1} />
            </ActionIcon>
          )}
          {isList && (
            <ActionIcon size="md" variant="transparent" component={Link} to="/active-log/summary">
              <IconChecklist stroke={1} />
            </ActionIcon>
          )}
        </Flex>
      </TopBar>
      <Outlet />
    </Stack>
  );
};
