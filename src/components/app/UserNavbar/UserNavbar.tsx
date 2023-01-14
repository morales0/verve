import { ActionIcon, Flex, Group, Header, Title, useMantineColorScheme } from "@mantine/core"
import { Icon } from '@iconify/react';


type Props = {}

const UserNavbar = ({ }: Props) => {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <Header height={"auto"}>
      <Flex
        direction={"row"}
        justify={"space-between"}

        px={"md"}
        py={"sm"}
      >
        <Title order={1}>
          Verve
        </Title>

        <Group>
          <div>Exercises</div>
          <div>Data</div>
          <div>History</div>
        </Group>

        <Group>
          <ActionIcon size="lg" title="Theme switcher" onClick={() => toggleColorScheme()}>
            <Icon icon="mdi:theme-light-dark" height={25} />
          </ActionIcon>
          <ActionIcon size="lg" title="Settings">
            <Icon icon="ph:gear" height={25} />
          </ActionIcon>
          <ActionIcon size="lg" title="User">
            <Icon icon="mdi:user" height={25} />
          </ActionIcon>
        </Group>

      </Flex>
    </Header>
  )
}

export default UserNavbar