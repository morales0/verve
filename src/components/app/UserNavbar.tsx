import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Box,
  Center,
  Flex,
  SimpleGrid,
  Text,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import cx from "clsx";
import { Link } from "react-router-dom";
import classes from "./user-navbar.module.css";

const UserNavbar = () => {
  const { toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme("light");

  return (
    <Box className={cx(classes.root)} h={"auto"} pos="sticky">
      <SimpleGrid cols={3} px="md" py={rem(8)} w="100%">
        <Flex>
          <ActionIcon
            size="lg"
            variant="transparent"
            color={`gray.${colorScheme === "dark" ? 3 : 6}`}
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
          <Link to="/user">
            <ActionIcon size="lg" variant="transparent" color="indigo" title="User" component="div">
              <Icon icon="mdi:robot-happy-outline" height={25} />
            </ActionIcon>
          </Link>
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

export default UserNavbar;
