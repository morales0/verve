import { Button, PageHeader } from "components";
import styled from "styled-components";

const DataPageHeader = styled(PageHeader)`
  padding: 0.6rem;
`;

const ExerciseOption = styled(Button)``;

const StyledExerciseBar = styled.div`
  grid-row: span 2;

  background: #f1f1f1;
  box-shadow: 0 0 3px 1px rgb(0 0 0 / 15%);

  & > header {
    display: grid;
    place-items: center;
    padding: 0.6rem;
  }

  & .headerTitle {
  }

  & > .exerciseBarContent_container {
    display: flex;
    flex-direction: column;
    padding: 0.6rem;

    & .exerciseOption_btn + .exerciseOption_btn {
      margin-top: 0.5rem;
    }
  }
`;

const ExerciseBar = ({ exercises, setExercise }) => {
  return (
    <StyledExerciseBar>
      <header>
        <h3 className="headerTitle">Exercises</h3>
      </header>
      <div className="exerciseBarContent_container">
        {exercises?.map((ex, i) => (
          <ExerciseOption
            key={`${ex.name - i}`}
            className="exerciseOption_btn"
            onClick={() => setExercise(ex)}
          >
            {ex.name}
          </ExerciseOption>
        ))}
      </div>
    </StyledExerciseBar>
  );
};

const DataContainer = styled.div`
  padding: 0.6rem;
`;

export { ExerciseBar, DataPageHeader, DataContainer };
