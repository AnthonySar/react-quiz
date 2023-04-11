import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebaseConfig';
import Logout from '../Logout';
import Quiz from '../Quiz';

const Welcome = () => {

  const [userSession, setUserSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let userListener = auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : navigate('/')
    })

    return () => {
      userListener();
    }
  }, []);

  return userSession === null ? (
    <>
      <div className='loader'>
        <span className='loaderText'></span>
      </div>
    </>
  ) : (
    <div className='quiz-bg'>
      <div className='container'>
        <Logout />
        <Quiz />
      </div>
    </div>
  )
}

export default Welcome;