import React from 'react'
import errorImg from '../../images/batman.png';

const styleH2 = {
  textAlign: 'center',
  marginTop: '50px'
};

const styleImg = {
  display: 'block',
  margin: '40px auto'
}

const ErrorPage = () => {
  return (
    <div className='quiz-bg'>
      <div className='container'>
        <h2 style={styleH2}>Oups, cette page n'existe pas !</h2>
        <img src={errorImg} style={styleImg} alt='Error page' />
      </div>
    </div>
  )
}

export default ErrorPage