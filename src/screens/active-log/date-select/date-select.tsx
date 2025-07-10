import { useState } from "react";
import { DateInput, DateValue } from "@mantine/dates";
import { Center } from "@mantine/core";
import { IconChevronDown, IconEdit } from "@tabler/icons-react";
import { useDatabaseValue } from "@/hooks/db";
import dayjs from "dayjs";
import classes from "./data-select.module.css";

export const DateSelect = () => {
  const { data, loading, api } = useDatabaseValue<string>("activeLog/date");
  const handleOnChange = (value: DateValue) => {
    api.setValue(value?.toDateString() ?? new Date().toDateString());
  };
  const currValue = data ? new Date(data) : undefined;

  return (
    <Center mx="auto" style={{ flexGrow: 1, flexBasis: 100 }}>
      <DateInput
        classNames={{ input: classes.input }}
        value={currValue}
        onChange={handleOnChange}
        placeholder="Enter date"
        size="sm"
        maxDate={dayjs(new Date()).toDate()}
        pointer
        rightSection={<IconChevronDown stroke={1} color="var(--mantine-color-text)" />}
      />
    </Center>
  );
};
