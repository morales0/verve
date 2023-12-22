import { Icon } from "@iconify/react";
import { Flex, TextInput, ActionIcon } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export type SearchProps = {
  query: string;
  setQuery: (value: string) => void;
  filterOption: string | undefined;
  toggleFilterOption: (option: "filter" | "sort" | undefined) => void;
  setFilterOption: (option: "filter" | "sort" | undefined) => void;
};

export const Search = ({ query, setQuery, filterOption, toggleFilterOption, setFilterOption }: SearchProps) => {
  // console.log("SEARCH");
  const navigate = useNavigate();

  /* Functions */
  const navigateToExerciseForm = () => {
    const nameParam = query ? `?name=${query}` : "";
    navigate(`/exercise-form${nameParam}`, { state: { prevPath: "/workout" } });
  };

  return (
    <Flex align="center" gap="xs" w="100%" py="xs" px="xs">
      <TextInput
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        variant="unstyled"
        placeholder="Search or create ..."
        styles={{ root: { flexGrow: 1 } }}
      />
      <ActionIcon size="lg" radius="sm" variant="light" color="teal" onClick={navigateToExerciseForm}>
        <Icon icon="gridicons:create" />
      </ActionIcon>
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
      <ActionIcon
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
      </ActionIcon>
    </Flex>
  );
};
