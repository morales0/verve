import React from 'react'

import './Exercise.css'

const Exercise = (props) => {
   return (
      <div className="Exercise">
         <header>
            {props.name}
         </header>

         <div className="Exercise_data">
            <div>
               Set 1
            </div>
            <div>
               Set 2
            </div>
            <div>
               Set 3
            </div>
            <div>
               Set 4
            </div>
         </div>
      </div>
   )
}

export default Exercise
