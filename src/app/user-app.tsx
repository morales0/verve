import { ActiveExercise, List } from "@/components/app";
import { ActiveLog, Home } from "@/screens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router-dom";

// Adding queries only to authenticated app
// ? What about offline or guest functionality
const queryClient = new QueryClient();

const UserApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="active-log" element={<ActiveLog />}>
          <Route index element={<List />} />
          <Route path="summary" element={<> Summary of active log </>} />
          <Route path=":id" element={<ActiveExercise />} />
        </Route>

        <Route path="log" element={<>Full page view of all logs</>}>
          <Route path=":logId" element={<>See and edit one log</>} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default UserApp;
