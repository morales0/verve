import { Box } from "@mantine/core";

export const Bar = () => {
  return (
    <Box
      style={(theme) => ({
        height: "15px",
        width: "150px",
        backgroundColor: theme.colors.gray[4],
        borderTop: `1px solid`,
        borderBottom: `1px solid`,
        borderColor: theme.colors.gray[5],
      })}
    />
  );
};
