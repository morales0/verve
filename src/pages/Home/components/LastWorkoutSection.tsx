import { Stack, Group, Title, Button, Paper } from '@mantine/core'
import React from 'react'

type Props = {}

const LastWorkoutSection = (props: Props) => {
  return (
    <Stack mb={'2rem'}>
      <Group position='apart'>
        <Title order={2} >Last Workout</Title>
        <Button color={'teal'}>+ New Workout</Button>
      </Group>

      <Paper shadow="xs" radius="sm" p="lg" withBorder >
        No workout history... Get your verve on!
      </Paper>

    </Stack>
  )
}

export default LastWorkoutSection