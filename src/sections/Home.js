import { Idea } from './Idea'
import { List } from './List'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export const Home = () => {
  const { user, setUser, isLogged } = useContext(AuthContext);
  const [newIdea, setNewIdea] = useState({});

  return (
    <div className='container'>
      <div className='section'>
        <Idea />
        <List />
      </div>
    </div>
  )
}



