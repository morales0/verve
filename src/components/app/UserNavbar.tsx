import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Box,
  Center,
  createStyles,
  Flex,
  Menu,
  SimpleGrid,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const useStyles = createStyles((theme) => ({
  root: {
    background: "transparent",
    borderBottom: "1px solid",
    borderBottomColor: theme.colorScheme === "light" ? theme.colors.gray[4] : theme.colors.gray[7],
    zIndex: 999,
  },
  rootNotAtTop: {},
  brand: {
    // color: theme.white,
  },
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
  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.root)} h={"auto"} pos="sticky">
      <SimpleGrid cols={3} px={"md"} py={"sm"} w="100%">
        <Flex>
          <ActionIcon size="lg" title="Theme switcher" onClick={() => toggleColorScheme()}>
            <Icon icon="mdi:theme-light-dark" height={25} />
          </ActionIcon>
        </Flex>

        <Center>
          <Link className={classes.brand} to="/">
            <Text fz="xl" fw={500}>
              verve
            </Text>
          </Link>
        </Center>

        <Flex justify="flex-end">
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
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

export default UserNavbar;
