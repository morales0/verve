import { useState, useEffect } from "react";

import './ExerciseToolbar.scss'


import { ExerciseInfo, ExerciseToolbarAside } from "./components";

const ExerciseToolbar = (props) => {
   const [collapsed, setCollapsed] = useState();

   return ( 
      <ExerciseToolbarAside className="exerciseToolbar_container" collapsed={props.collapsed}>
         <header className="exerciseToolbar_header">
            <h3>Exercises</h3>
         </header>

         <div className="exerciseToolbar-main_container">
            {props.exerciseList.map((ex) => 
               <ExerciseInfo key={ex.name + '-add'} name={ex.name} 
                  handleAdd={() => props.handleAdd(ex.name, ex.measures)}
               />
            )}
         </div>
      </ExerciseToolbarAside>
   );
}
 
export default ExerciseToolbar;