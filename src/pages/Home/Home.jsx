import React from 'react'
import { useAuth } from 'reactfire';

import './Home.css';

const Home = () => {
   const auth = useAuth()
   return (
      <div>
         Home
      </div>
   )
}

export default Home
