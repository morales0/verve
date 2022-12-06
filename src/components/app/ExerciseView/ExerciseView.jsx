import {
  StyledExerciseView,
  Header,
  Body,
  SetGrid,
  Val,
  Labels,
  Label,
} from "./styles";

const ExerciseView = ({ name, sets, measures }) => {
  return (
    <StyledExerciseView>
      <Header>{name}</Header>
      <Body>
        <SetGrid cols={sets.length} rows={measures.length}>
          {sets.map((set, i) =>
            Object.values(set).map((val, j) => (
              <Val key={`val-${i}-${j}`}>{val}</Val>
            ))
          )}
        </SetGrid>
        <Labels>
          {measures.map((measure, i) => (
            <Label key={`measure-${i}`}>{measure}</Label>
          ))}
        </Labels>
      </Body>
    </StyledExerciseView>
  );
};

export default ExerciseView;
