import React from 'react'
import { useAuth } from 'reactfire';

import './Home.css';

const Home = () => {
   const auth = useAuth()
   return (
      <div>
         <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
   )
}

export default Home
