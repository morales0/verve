import { PageHeader } from "components";
import { useState, useEffect } from "react";
import { DataPageHeader, ExerciseBar, DataContainer } from "./components/styled-components";

import './Data.scss'

const Data = (props) => {
   return (
      <div className='Data_page'>
         <DataPageHeader 
            title='Exercise Data'
         />

         <ExerciseBar />
         
         <DataContainer>
            Data
         </DataContainer>
      </div>

   );
}

export default Data;