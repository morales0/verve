import { Button, Stack } from '@mantine/core'
import { signOut } from 'firebase/auth'
import { useAuth } from '../../context/auth'
import HistorySection from './components/HistorySection'
import LastWorkoutSection from './components/LastWorkoutSection'
import MuscleGroupsSection from './components/MuscleGroupsSection'


type Props = {}

const Home = (props: Props) => {
  const { auth } = useAuth()

  return (
    <Stack>
      <Button onClick={() => signOut(auth)}>Sign Out</Button>
      <MuscleGroupsSection />
      <LastWorkoutSection />
      <HistorySection />
    </Stack>
  )
}

export default Home