import { ActiveExercise, List } from "@/components/app";
import { FocusAreasProvider, TagsProvider } from "@/context";
import { Home, ActiveLog } from "@/screens";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const UserApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <FocusAreasProvider>
        <TagsProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="active-log" element={<ActiveLog />}>
              <Route index element={<List />} />
              <Route path="summary" element={<> Summary </>} />
              <Route path=":id" element={<ActiveExercise />} />
            </Route>

            <Route path="log/:logId" element={<>See and edit a logged exercise</>} />
          </Routes>
        </TagsProvider>
      </FocusAreasProvider>
    </QueryClientProvider>
  );
};

export default UserApp;
