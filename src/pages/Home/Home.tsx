import { Icon } from "@iconify/react";
import { Tabs, createStyles } from "@mantine/core";
import { Exercises, MainView } from "../../components/pages/Home";

const useStyles = createStyles((theme) => ({
  root: {
    overflow: "auto",
    height: "100%",
  },
  tabs: {
    position: "sticky",
    top: 0,
    zIndex: 99,
    backdropFilter: `blur(10px)`,
    "& > button": {
      transitionDuration: "0s",
    },
  },
}));
const Home = () => {
  const { classes } = useStyles();

  return (
    <Tabs className={classes.root} variant="pills" radius="lg" defaultValue="home">
      <Tabs.List grow className={classes.tabs} p="xs">
        <Tabs.Tab value="home" icon={<Icon icon="bi:fire" />} color="indigo.6">
          Home
        </Tabs.Tab>
        <Tabs.Tab value="exercises" icon={<Icon icon="material-symbols:exercise-outline-sharp" />} color="teal.7">
          Exercises
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="home" pt="xs">
        <MainView />
      </Tabs.Panel>

      <Tabs.Panel value="exercises" pt="xs">
        <Exercises />
      </Tabs.Panel>
    </Tabs>
  );
};

export default Home;
