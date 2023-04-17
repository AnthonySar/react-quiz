import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
  const refImg = useRef(null);
  const [btn, setBtn] = useState(false);
  
  useEffect(() => {
    if (refImg) {
      refImg.current.classList.add('startingImg');
      setBtn(true);

      if (refImg.current.classList.contains('startingImg')) {
        setTimeout(() => {
          refImg.current.classList.remove('startingImg');
        }, 1000);
      }
    }
  }, []);

  const setLeftImg = () => {
    refImg.current.classList.add('leftImg');
  }

  const setRightImg = () => {
    refImg.current.classList.add('rightImg');
  }

  const clearImg = () => {
    if(refImg) {
      if (refImg.current.classList.contains('leftImg')) {
        refImg.current.classList.remove('leftImg');
      } else if (refImg.current.classList.contains('rightImg')) {
        refImg.current.classList.remove('rightImg')
      } 
    }

  }

  const displayBtn = btn && 
    <>
      <div onMouseOver={setLeftImg} onMouseOut={clearImg} className='leftBox'>
        <Link to="/signup" className='btn-welcome'><span>Inscription</span></Link>
      </div>
      <div onMouseOver={setRightImg} onMouseOut={clearImg} className='rightBox'>
        <Link to="/login" className='btn-welcome'><span>Connexion</span></Link>
      </div>
    </>;

  return (
    <main ref={refImg} className='welcomePage'>
      { displayBtn }
    </main>
  )
}

export default Landing;