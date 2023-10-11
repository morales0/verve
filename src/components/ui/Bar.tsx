import { Box, Center, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  bar: {
    height: "15px",
    width: "150px",
    backgroundColor: theme.colors.gray[4],
    borderTop: `1px solid`,
    borderBottom: `1px solid`,
    borderColor: theme.colors.gray[5],
  },
}));

export const Bar = () => {
  const { classes } = useStyles();

  return <Box className={classes.bar} />;
};
