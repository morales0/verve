import styled from "styled-components";
import RightArrow from "images/right-arrow.png";
import { Link } from "react-router-dom";
import useCustomExercises from "hooks/customExercises";

// Home layout styles
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Calendar styles/components
const Calendar = styled.div`
  padding: 1rem;
  overflow-y: auto;
`;

const Day = styled.div`
  margin-bottom: 0.7rem;
  opacity: ${(props) => (props.hasData ? "1" : ".6")};

  & > header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0.3rem;
    width: 75%;
    border-bottom: 1px solid
      ${(props) => (props.hasData ? "#83cfab" : "#b9b9b9")};
  }

  & > header h2 {
    font-size: 1.2rem;
  }

  & > .day_content {
    padding: 0.5rem;
  }

  & p.no-data {
    font-size: 0.8rem;
  }
`;

const WorkoutSummaryStyle = styled.div``;

const WorkoutSummary = ({ ex }) => {
  return (
    <WorkoutSummaryStyle>
      <header></header>
      <div></div>
    </WorkoutSummaryStyle>
  );
};

const StyledWorkoutCard = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-top: 0.4rem;
  border: 1px solid;

  color: inherit;
  text-decoration: none;
  border-color: #999;

  & .time {
    font-size: 0.85rem;
    color: #b3b3b3;
  }

  & .continue {
    font-size: 0.85rem;
    color: #a1d6a1;
  }

  & .body {
    margin: 0.5rem 0;
  }
`;

const WorkoutCard = ({
  to,
  complete,
  inProgress,
  completedExercises,
  currentExercises,
  timeStarted,
  timeEnded,
  ...rest
}) => {
  const customExercises = useCustomExercises();

  const exercisesList = () => {
    if (!completedExercises) {
      return [];
    }

    return Object.entries(completedExercises).map(([eid, data]) => {
      let name = customExercises.data[eid]?.name;
      let sets = data;

      return [name, sets];
    });
  };

  if (customExercises.status === "loading") {
    return null;
  }

  return (
    <StyledWorkoutCard to={to}>
      <div>
        {inProgress ? (
          <p className="time">Started at {timeStarted}</p>
        ) : (
          <p className="time">
            {timeStarted} - {timeEnded}
          </p>
        )}

        <div className="body">
          {exercisesList().map(([name, sets], i) => (
            <div key={`ex-${i}-${name}`}>{name}</div>
          ))}
        </div>
        {inProgress && <p className="continue">Click to continue</p>}
      </div>
      {inProgress && (
        <div>
          <img src={RightArrow} alt="right arrow" height={25} />
        </div>
      )}
    </StyledWorkoutCard>
  );
};

export { HomeContainer, Calendar, Day, WorkoutSummary, WorkoutCard };
