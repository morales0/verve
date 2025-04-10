import { FocusAreasProvider, TagsProvider, useUser } from "@/context";
import { Home, ActiveLog, ActiveExercise } from "@/screens";
import { Route, Routes } from "react-router-dom";

const UserApp = () => {
  const { user } = useUser();

  return (
    <FocusAreasProvider>
      <TagsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/active-log" element={<ActiveLog />} />
          <Route path="/active-log/:logId" element={<ActiveExercise />} />
          <Route path="/log/:logId" element={<>See and edit a logged exercise</>} />
        </Routes>
      </TagsProvider>
    </FocusAreasProvider>
  );
};

export default UserApp;
