import { Stack, Title, Divider, Group, Card } from '@mantine/core'
import React from 'react'

type Props = {}

const HistorySection = (props: Props) => {
  return (
    <Stack>
      <Stack mb={'1.5rem'}>
        <Title order={3}>
          Today
        </Title>
        <Divider />
        <Group>
          <Card withBorder>
            Workout 1
          </Card>
          <Card withBorder>
            Workout 1
          </Card>
        </Group>
      </Stack>
      <Stack mb={'1.5rem'}>
        <Title order={3}>
          Yesterday
        </Title>
        <Divider />
        <Group>
          <Card withBorder>
            Workout 1
          </Card>
          <Card withBorder>
            Workout 1
          </Card>
        </Group>
      </Stack>

      <Stack mb={'1.5rem'}>
        <Title order={3}>
          Sunday, 1/15/2022
        </Title>
        <Divider />
        <Group>
          <Card withBorder>
            Workout 1
          </Card>
          <Card withBorder>
            Workout 1
          </Card>
        </Group>
      </Stack>

      <Stack mb={'1.5rem'}>
        <Title order={3}>
          Saturday, 1/14/2022
        </Title>
        <Divider />
        <Group>
          <Card withBorder>
            Workout 1
          </Card>
          <Card withBorder>
            Workout 1
          </Card>
        </Group>
      </Stack>


    </Stack>
  )
}

export default HistorySection