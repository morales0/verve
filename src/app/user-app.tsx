import { List } from "@/components/app";
import { FocusAreasProvider, TagsProvider } from "@/context";
import { Home, ActiveLog, ActiveExercise } from "@/screens";
import { Route, Routes } from "react-router-dom";

const UserApp = () => {
  return (
    <FocusAreasProvider>
      <TagsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="active-log" element={<ActiveLog />}>
            <Route index element={<List />} />
            <Route path="summary" element={<> Summary </>} />
            <Route path=":logId" element={<> Exercise </>} />
          </Route>

          <Route path="log/:logId" element={<>See and edit a logged exercise</>} />
        </Routes>
      </TagsProvider>
    </FocusAreasProvider>
  );
};

export default UserApp;
