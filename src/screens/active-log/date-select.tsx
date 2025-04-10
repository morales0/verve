import { useState } from "react";
import { DateInput } from "@mantine/dates";
import { Center } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

export const DateSelect = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  return (
    <Center>
      <DateInput value={value} onChange={setValue} placeholder="Enter date" size="sm" />
    </Center>
  );
};
