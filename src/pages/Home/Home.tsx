import { Stack } from '@mantine/core'
import HistorySection from './components/HistorySection'
import LastWorkoutSection from './components/LastWorkoutSection'
import MuscleGroupsSection from './components/MuscleGroupsSection'


type Props = {}

const Home = (props: Props) => {
  return (
    <Stack>
      <MuscleGroupsSection />
      <LastWorkoutSection />
      <HistorySection />
    </Stack>
  )
}

export default Home