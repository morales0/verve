import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { flexRow, flexCol, flexCenter } from "layout";
import { useDatabase } from "reactfire";
import { useAuthCheck } from "context/auth";
import { useHistory } from "hooks/history";
import { Link } from "react-router-dom";
import { Button, PageHeader } from "components";
import ExerciseDropdown from "./components/ExerciseDropdown";

// Styled components
const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > header {
    padding: 1rem;
  }

  & > .historyMainContent_container {
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;

    // background: #ffa2a240;

    .historyDay_container + .historyDay_container {
      margin-top: 1.5rem;
    }

    .workoutListDay_container {
      display: flex;
      padding: 0.75rem 0;
      overflow-x: auto;
    }

    .exercises_container {
      overflow-y: auto;
    }
  }

  // DEV
  & > * {
    // border: 1px solid #333;
  }
`;

const WorkoutDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 200px;
  padding: 0.5rem;
  width: 200px;
  height: 300px;
  background: #f3e8b1;
  border: 1px solid #b5b5b5;
  border-radius: 3px;

  & + & {
    margin-left: 1rem;
  }

  & > .date {
    display: flex;
    justify-content: flex-end;

    margin-top: auto;
  }
`;

const dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// History component
const History = (props) => {
  const workoutHistory = useHistory();
  const [militaryTime, setMilitaryTime] = useState(false);
  const [listOfDays, setListOfDays] = useState([]);
  const [workoutsByDay, setWorkoutsByDay] = useState({});

  // Once, on mount, create array of days from today
  useEffect(() => {
    const now = new Date();
    const days = [];
    for (let index = 0; index < 6; index++) {
      let nextDate = new Date();
      nextDate.setDate(now.getDate() - index);
      days.push(nextDate);
    }

    setListOfDays(days);
  }, []);

  // Construct workout by day map when history changes
  useEffect(() => {
    if (workoutHistory.data !== null) {
      let newWorkoutsByDay = {};

      // Create json
      Object.values(workoutHistory.data)
        .reverse()
        .forEach((workout) => {
          // Index by string describing unique day
          const workoutDate = new Date(workout.dateStarted);
          const workoutKey = toDateKey(workoutDate);

          // Push to array, make new one if necessary
          if (workoutKey in newWorkoutsByDay) {
            newWorkoutsByDay[workoutKey].push(workout);
          } else {
            newWorkoutsByDay[workoutKey] = [workout];
          }
        });

      setWorkoutsByDay(newWorkoutsByDay);
    }
  }, [workoutHistory.data]);

  // Functions

  const toDateKey = (date) => {
    const day = dayOfWeek[date.getDay()];
    const dateNum = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day}, ${month}-${dateNum}-${year}`;
  };

  const toTimeString = (date) => {
    const hour = date.getHours();
    const min = date.getMinutes();

    return `${!militaryTime && hour > 12 ? hour % 12 : hour}:${
      min < 10 ? "0" + min : min
    }${militaryTime ? "" : hour > 12 ? " PM" : " AM"}`;
  };

  const areSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getDay() === date2.getDay() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Turn dates into strings like "today", "yesterday", etc
  const dateToDetailString = (date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (areSameDay(today, date)) {
      return "Today";
    } else if (areSameDay(yesterday, date)) {
      return "Yesterday";
    } else {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    }
  };

  const orgByDay = (workouts) => {
    const workoutsByDay = {};
    const dayOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    workouts.forEach((workout) => {
      console.log(workout);
      const workoutDate = new Date(workout.dateStarted);

      const day = dayOfWeek[workoutDate.getDay()];
      const date = workoutDate.getDate();
      const month = workoutDate.getMonth();
      const year = workoutDate.getFullYear();

      const key = `${day}, ${month}-${date}-${year}`;

      // Save the workouts in an array hashed by day
      if (key in workoutsByDay) {
        workoutsByDay[key].push(workout);
      } else {
        workoutsByDay[key] = [workout];
      }
    });

    return workoutsByDay;
  };

  return (
    <HistoryContainer>
      <header
        css={`
          ${flexRow}
        `}
      >
        <PageHeader title="History" />
      </header>

      <div className="historyMainContent_container">
        {listOfDays.map((day, i) => (
          <div className="historyDay_container">
            <h2>{dateToDetailString(day)}</h2>
            {workoutHistory.status === "loading" ? (
              <div>Loading...</div>
            ) : (
              <div className="workoutListDay_container">
                {workoutsByDay[toDateKey(day)]
                  ? Object.values(workoutsByDay[toDateKey(day)]).map(
                      (workout) => (
                        <WorkoutDisplayContainer>
                          <div className="searchFilter_container">
                            <input
                              type="text"
                              placeholder="We will use this to filter"
                            />
                          </div>
                          <div className="exercises_container">
                            {Object.values(workout.exercises).map((ex) => (
                              <ExerciseDropdown name={ex.name} sets={ex.sets} />
                            ))}
                          </div>
                          <div className="date">
                            {toTimeString(new Date(workout.dateStarted))}
                          </div>
                        </WorkoutDisplayContainer>
                      )
                    )
                  : "No workouts"}
              </div>
            )}
          </div>
        ))}
        <Button>Load more...</Button>
      </div>
    </HistoryContainer>
  );
};

export default History;
