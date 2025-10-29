import { useDatabaseValue } from "@/api";
import { useUser } from "@/context";
import { updateActiveLogDate } from "@/services/active-log.service";
import { Center } from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";
import classes from "./data-select.module.css";

export const DateSelect = () => {
  const { user } = useUser();
  const { data } = useDatabaseValue<string>("activeLog/date");

  const handleOnChange = async (value: DateValue) => {
    const newDate = value ? dayjs(value).toDate().toLocaleDateString() : new Date().toLocaleDateString();
    await updateActiveLogDate(user.uid, newDate);
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
