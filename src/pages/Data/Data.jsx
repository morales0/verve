import { ExerciseView } from "components/app";
import { useParams } from "react-router-dom";
import { toDateString } from "util/date";
import { Body, Header, StyledData } from "./styles";
import useDataPage from "./useDataPage";
import useCustomExercises from "hooks/customExercises";

const Data = () => {
  const { date, time } = useParams();
  const { status, data } = useDataPage(date, time);
  const customExercises = useCustomExercises();

  const dateString = () => {
    const dateObj = new Date();
    dateObj.setFullYear(date.slice(0, 4));
    dateObj.setMonth(parseInt(date.slice(5, 7)) - 1);
    dateObj.setDate(date.slice(8, 10));

    return toDateString(dateObj);
  };

  if (customExercises.status === "loading") {
    return null;
  }

  return (
    <StyledData>
      <Header>
        <h2>{dateString()}</h2>
      </Header>
      {status === "success" ? (
        <Body>
          {Object.entries(data.completedExercises).map(([id, sets], i) => (
            <ExerciseView
              key={`${id}-${i}`}
              name={customExercises.data[id].name}
              sets={sets}
              measures={Object.keys(sets[0])}
            />
          ))}
        </Body>
      ) : status === "loading" ? (
        <div>Loading data...</div>
      ) : (
        <div>Something went wrong.</div>
      )}
    </StyledData>
  );
};

export default Data;
