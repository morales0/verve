import styled from "styled-components";

const StyledExerciseGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.75rem;

  flex-grow: 1;
  padding: 0.5rem;

  background-size: 21px 21px;
  background-image: radial-gradient(
    circle,
    #cdcdcdab 1px,
    rgba(0, 0, 0, 0) 1px
  );
`;

export { StyledExerciseGrid };
