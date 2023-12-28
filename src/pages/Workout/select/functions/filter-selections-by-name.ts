import { ExerciseSelection } from "./map-exercises-to-selections";

export const filterSelectionsByExerciseName = (selections: ExerciseSelection[][], query: string) =>
  selections.map((selection) => selection.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase())));
