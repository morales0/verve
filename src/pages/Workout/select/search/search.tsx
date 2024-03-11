import { Icon } from "@iconify/react";
import {
  Flex,
  TextInput,
  ActionIcon,
  rem,
  Button,
  defaultCssVariablesResolver,
  useMantineTheme,
  Menu,
  Group,
  Drawer,
  Accordion,
  Chip,
  CloseButton,
  Stack,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./search.module.css";
import { IconFilter, IconSearch, IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import useMuscleGroups from "@/hooks/muscleGroups.hook";
import { mockTypeData } from "@/pages/ExerciseForm";

export const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "lastUsed", label: "Last Used" },
  { value: "created", label: "Created" },
];

export const FILTER_OPTIONS = [
  { value: "muscleGroups", label: "Muscle Groups" },
  { value: "type", label: "Type", options: ["Dumbbell", "Barbell", "Bodyweight"] },
];

export type SearchProps = {
  query: string;
  setQuery: (value: string) => void;
  filterOption: string | undefined;
  toggleFilterOption: (option: "filter" | "sort" | undefined) => void;
  setFilterOption: (option: "filter" | "sort" | undefined) => void;
  sort: { order: string; value: string; label: string };
  filters: Record<string, string[]>;
  setSort: (value: { value: string; label: string }) => void;
  setOrder: (value: string) => void;
  setFilters: (value: Record<string, string[]>) => void;
  changeFilter: (key: string, value: string, checked: boolean) => void;
};

export const Search = ({
  query,
  setQuery,
  filterOption,
  toggleFilterOption,
  setFilterOption,
  sort,
  filters,
  setSort,
  setOrder,
  setFilters,
  changeFilter,
}: SearchProps) => {
  // console.log("SEARCH");
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: groups } = useMuscleGroups();

  const FILTER_OPTIONS = [
    { value: "muscleGroups", label: "Muscle Groups", options: groups?.map((group) => group.name) },
    { value: "type", label: "Type", options: mockTypeData.map((t) => t.name) },
  ];

  // console.log(filters);

  /* Functions */

  const variantColors = theme.variantColorResolver({ color: "indigo", variant: "light", theme });

  return (
    <Flex align="center" gap="xs" w="100%" py={rem(8)} px="xs">
      <TextInput
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        variant="unstyled"
        leftSectionPointerEvents="none"
        leftSection={<IconSearch style={{ width: rem(13), height: rem(13) }} />}
        placeholder="Search..."
        classNames={{ root: classes.search, input: classes.input }}
        rightSectionPointerEvents={query === "" ? "none" : "all"}
        rightSection={
          query === "" ? null : (
            <CloseButton
              size="xs"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => setQuery("")}
              aria-label="Clear value"
            />
          )
        }
        size="xs"
        style={{
          "--ti-bg": variantColors.background,
          "--ti-color": variantColors.color,
          "--ti-border": variantColors.border,
          "--ti-hover": variantColors.hover,
          "--ti-hover-color": variantColors.hoverColor,
        }}
      />
      <Menu>
        <Menu.Target>
          <Button
            classNames={{ root: classes.sort, section: classes.leftSection }}
            variant="light"
            color="indigo"
            size="xs"
            radius="md"
            leftSection={
              sort.order === "desc" ? (
                <Icon icon="lets-icons:sort-down-light" />
              ) : (
                <Icon icon="lets-icons:sort-up-light" />
              )
            }
            fw={400}
            justify="space-between"
          >
            {sort.label}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Order</Menu.Label>
          <Group wrap="nowrap" justify="center" gap={0}>
            <Menu.Item onClick={() => setOrder("desc")} color={sort.order === "desc" ? "indigo.4" : undefined}>
              <Icon icon="lets-icons:sort-down-light" />
            </Menu.Item>
            <Menu.Item onClick={() => setOrder("asc")} color={sort.order === "asc" ? "indigo.4" : undefined}>
              <Icon icon="lets-icons:sort-up-light" />
            </Menu.Item>
          </Group>
          <Menu.Label>Sort by</Menu.Label>
          {SORT_OPTIONS.map((option) => (
            <Menu.Item
              key={option.value}
              onClick={() => setSort(option)}
              color={sort.value === option.value ? "indigo.4" : undefined}
            >
              {option.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>

      <Drawer offset={20} position="bottom" radius="md" opened={opened} onClose={close} title="Filters">
        <Stack gap="xs" py="xs">
          <Button
            leftSection={<Icon icon="mdi:filter-remove" />}
            onClick={() => setFilters({})}
            size="xs"
            color="red"
            variant="light"
          >
            Clear Filters
          </Button>
          <Accordion multiple={true}>
            {FILTER_OPTIONS.map((item) => (
              <Accordion.Item key={item.value} value={item.value}>
                <Accordion.Control>
                  {item.label} {filters?.[item.value] && `(${filters?.[item.value].length})`}
                </Accordion.Control>
                <Accordion.Panel>
                  <Flex wrap="wrap" gap="xs">
                    {item.options?.map((option) => {
                      const isChecked = !!filters?.[item.value]?.includes(option);

                      return (
                        <Chip
                          key={option}
                          checked={isChecked}
                          onChange={(checked) => changeFilter(item.value, option, checked)}
                        >
                          {option}
                        </Chip>
                      );
                    })}
                  </Flex>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Stack>
      </Drawer>
      <Button
        classNames={{ root: classes.filter, label: classes.filterLabel, section: classes.leftSection }}
        leftSection={<Icon icon="circum:filter" />}
        variant="light"
        size="xs"
        radius="md"
        color="teal"
        onClick={open}
      >
        {Object.values(filters).some((v) => v.length > 0)
          ? `(${Object.values(filters).reduce((sum, curr) => sum + curr.length, 0)})`
          : "Filters"}
      </Button>

      {/* <ActionIcon size="lg" radius="sm" variant="light" color="teal" onClick={navigateToExerciseForm}>
        <Icon icon="gridicons:create" />
      </ActionIcon> */}
      {/* <ActionIcon
        size="lg"
        radius="sm"
        variant={filterOption === "filter" ? "filled" : "light"}
        color="blue"
        onClick={() => toggleFilterOption("filter")}
      >
        <Icon icon="mdi:filter-outline" />
      </ActionIcon>
      <ActionIcon
        size="lg"
        radius="sm"
        variant={filterOption === "sort" ? "filled" : "light"}
        color="blue"
        onClick={() => toggleFilterOption("sort")}
      >
        <Icon icon="iconoir:sort" />
      </ActionIcon> */}
      {/* <ActionIcon
        size="lg"
        radius="sm"
        variant="light"
        color="pink"
        disabled={query === ""}
        onClick={() => {
          setQuery("");
          setFilterOption(undefined);
        }}
      >
        <Icon icon="tdesign:filter-clear" />
      </ActionIcon> */}
    </Flex>
  );
};
