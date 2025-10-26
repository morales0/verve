import { useDatabaseValue } from "@/api";
import { Center } from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";
import classes from "./data-select.module.css";

export const DateSelect = () => {
  const { data } = useDatabaseValue<string>("activeLog/date");
  const handleOnChange = (value: DateValue) => {
    const newDate = value?.toString() ?? new Date().toDateString();
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
        variant="default"
        maxDate={dayjs(new Date()).toDate()}
        pointer
      />
    </Center>
  );
};
