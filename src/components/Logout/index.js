import React, { useState, useEffect } from "react";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const { pseudo } = props.userData;
  
  useEffect(() => {
    if (checked) {
      signOut(auth)
      .then(() => {
        setTimeout(() => {
          navigate('/')
        }, 1000)
      }).catch(error => {
        console.log(error)
      })
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const handleChange = (e) => {
    setChecked(e.target.checked)
  }

  return (
    <div className="logoutContainer">
      <h2 className="custom-h2">Hi, {pseudo}</h2>
      <label className="switch">
        <input
          onChange={handleChange}
          type="checkbox"
          checked={checked}
        />
        <span className="slider round" data-tooltip-id="ttpLogout" data-tooltip-content="Déconnexion"></span>
      </label>
      <Tooltip id="ttpLogout"/>
    </div>
  )
}

export default Logout;