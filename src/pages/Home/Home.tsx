import { Icon } from "@iconify/react";
import { Tabs } from "@mantine/core";
import classes from "./home.module.css";

export const Home = () => {
  return (
    <Tabs
      className={classes.root}
      classNames={{ panel: classes.panel, tab: classes.tab }}
      variant="pills"
      radius="lg"
      defaultValue="home"
    >
      <Tabs.List grow className={classes.tabs} p="xs">
        <Tabs.Tab value="home" leftSection={<Icon icon="bi:fire" />} color="indigo.6">
          Home
        </Tabs.Tab>
        <Tabs.Tab
          value="exercises"
          leftSection={<Icon icon="material-symbols:exercise-outline-sharp" />}
          color="teal.7"
        >
          Exercises
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="home">
        {/* <MainView /> */}
        Main View
      </Tabs.Panel>

      <Tabs.Panel value="exercises">
        {/* <Exercises /> */}
        Exercises
      </Tabs.Panel>
    </Tabs>
  );
};
