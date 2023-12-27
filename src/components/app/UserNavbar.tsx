import { Icon } from "@iconify/react";
import { ActionIcon, Box, Center, Flex, Menu, SimpleGrid, Text, rem, useMantineColorScheme } from "@mantine/core";
import cx from "clsx";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import classes from "./user-navbar.module.css";

const UserNavbar = () => {
  const { auth } = useAuth();
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <Box className={cx(classes.root)} h={"auto"} pos="sticky">
      <SimpleGrid cols={3} px={"md"} py={rem(8)} w="100%">
        <Flex>
          <ActionIcon
            size="lg"
            variant="transparent"
            color="indigo"
            title="Color scheme toggle"
            onClick={() => toggleColorScheme()}
          >
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
          <Menu position="bottom-end" shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon size="lg" variant="transparent" color="indigo" title="User">
                <Icon icon="mdi:robot-happy-outline" height={25} />
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
