import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, user } from '../Firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import './Welcome.css';
import Logout from '../Logout';
import Quiz from '../Quiz';

const Welcome = () => {

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let userListener = onAuthStateChanged(auth, user => {
      user ? setUserSession(user) : navigate('/')
    })

    if (!!userSession) {
      const userId = user(userSession.uid);

      getDoc(userId)
      .then( snapshot => {
        if (snapshot.exists()) {
          const docData = snapshot.data();
          setUserData(docData);
        }
      })
      .catch( error => {
        console.log(error)
      })
    }

    return () => {
      userListener();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession]);

  return userSession === null ? (
    <>
      <div className='loader'>
        <span className='loaderText'></span>
      </div>
    </>
  ) : (
    <div className='quiz-bg'>
      <div className='container'>
        <Logout userData={userData} />
        <Quiz userData={userData}/>
      </div>
    </div>
  )
}

export default Welcome;