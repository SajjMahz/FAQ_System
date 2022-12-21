import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Link to={'/auth'} className='text-blue-500 underline'>Login</Link>
        <div className='font-bold text-center text-2xl'>Create a Question?</div>
    </div>
  )
}

export default Home