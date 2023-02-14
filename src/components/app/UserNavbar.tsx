import { Icon } from "@iconify/react";
import { ActionIcon, createStyles, Flex, Group, Header, Menu, Title, useMantineColorScheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const useStyles = createStyles((theme) => ({
  brand: {},
  link: {
    display: "block",
    lineHeight: 1,
    padding: ".5rem .75rem",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    "&.active": {
      textDecoration: "underline",
    },

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const UserNavbar = () => {
  const { auth } = useAuth();
  const { toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  const largeScreen = useMediaQuery("(min-width: 1200px)");

  return (
    <Header height={"auto"} pos="sticky">
      <Flex direction={"row"} justify={"space-between"} align={"center"} px={"md"} py={"sm"}>
        <Link className={classes.brand} to="/">
          <Title order={largeScreen ? 1 : 3}>Verve</Title>
        </Link>

        {/* <Group>
          <NavLink className={classes.link} to="/exercises">
            Exercises
          </NavLink>
          <NavLink className={classes.link} to="/data">
            Data
          </NavLink>
          <NavLink className={classes.link} to="history">
            History
          </NavLink>
        </Group> */}

        <Group>
          {/* <Burger opened={false} className={classes.burger} /> */}
          <ActionIcon size="lg" title="Theme switcher" onClick={() => toggleColorScheme()}>
            <Icon icon="mdi:theme-light-dark" height={25} />
          </ActionIcon>
          <ActionIcon size="lg" title="Settings">
            <Icon icon="ph:gear" height={25} />
          </ActionIcon>
          <Menu position="bottom-end" shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon size="lg" title="User">
                <Icon icon="mdi:user" height={25} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Divider />
              <Menu.Item color="yellow" onClick={() => signOut(auth)}>
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Flex>
    </Header>
  );
};

export default UserNavbar;
