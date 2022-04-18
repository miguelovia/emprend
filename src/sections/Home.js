import { Idea } from './Idea'
import { List } from './List'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export const Home = () => {
  const { user, setUser, isLogged } = useContext(AuthContext);
  const [newIdea, setNewIdea] = useState({});
  const [ideas, setIdeas] = useState([]);

  return (
    <div className='container'>
      <div className='section home'>
        <Idea  ideas={ideas} />
        <List ideas={ideas} setIdeas={setIdeas} />
      </div>
    </div>
  )
}



