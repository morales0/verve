import useCustomExercises from "hooks/customExercises";
import { useHistory } from "hooks/history";
import useCurrentWorkout from "hooks/workout.js";
import React, { useState } from "react";
import styled from "styled-components";
import { toDateKey, toDateString } from "util/date";
import { WorkoutLink } from "./styled-components";
import { Calendar, Day, HomeContainer, WorkoutCard } from "../styles";

const Home = () => {
  const [today, setToday] = useState(new Date());
  const [calendarControl, setCalendarControl] = useState({
    amount: 3,
    type: "days",
  });

  const userHistory = useHistory(calendarControl.amount);
  const currWorkout = useCurrentWorkout();

  /* Functions */
  const updateCalendarControl = (e) => {
    setCalendarControl({
      ...calendarControl,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  return (
    <HomeContainer>
      <CalendarControl>
        <p>Last</p>
        <CalendarSelect
          name="amount"
          id="last-amount"
          value={calendarControl.amount}
          onChange={(e) => updateCalendarControl(e)}
        >
          <option value="3">3</option>
          <option value="7">7</option>
          <option value="30">30</option>
        </CalendarSelect>
        <p>days</p>
        {/* <CalendarSelect name="type" id="last-type" value={calendarControl.type} onChange={(e) => updateCalendarControl(e)}>
               <option value="days">days</option>
               <option value="exercises">exercises</option>
            </CalendarSelect> */}
      </CalendarControl>
      <Calendar>
        {userHistory.status === "loading" ? (
          <div>Loading user history</div>
        ) : (
          // Display the amount of days based on state
          [...Array(calendarControl.amount)].map((_, i) => {
            // Calculate the ith date
            let currDay = new Date();
            currDay.setDate(today.getDate() - i);

            // Create the unique key
            let dateKey = toDateKey(currDay);

            // Retrieve the workouts for this day
            let currWorkouts = [];
            if (userHistory.data[dateKey]) {
              currWorkouts = Object.values(userHistory.data[dateKey]).reverse();
            }

            return (
              <Day
                key={`day-${i}`}
                hasData={currWorkouts.length > 0 || i === 0}
              >
                <header className="day_header">
                  <h2>{toDateString(currDay)}</h2>
                </header>
                <div className="day_content">
                  {
                    // If today, check for current workout
                    i === 0 &&
                      currWorkout.status === "success" &&
                      (currWorkout.data?.inProgress ? (
                        <WorkoutCard
                          to="/workout"
                          completed={false}
                          {...currWorkout.data}
                        />
                      ) : (
                        <WorkoutLink to="/workout">
                          Start a new workout
                        </WorkoutLink>
                      ))
                  }
                  {
                    // Output data for this day
                    currWorkouts.length === 0
                      ? i !== 0 && <p className="no-data">No data</p>
                      : currWorkouts.map((w, j) => (
                          <WorkoutCard
                            key={`day-${i}-workout-${j}`}
                            {...w}
                            to={`/data/${w.dateKey}/${w.timeKey}`}
                          />
                        ))
                  }
                </div>
              </Day>
            );
          })
        )}
      </Calendar>
    </HomeContainer>
  );
};

const CalendarControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1rem 0.5rem 1rem;
  border-bottom: 1px solid #a9a9a9;

  & > select {
    font-size: 0.85rem;
  }
`;

const CalendarSelect = styled.select`
  border: 1px solid #ddd;
  border-radius: 2px;
  background-color: ${(props) => props.theme.bg};
  color: white;
`;

export default Home;
