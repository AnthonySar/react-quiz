import React from 'react'
import errorImg from '../../images/error-bro.svg';

const styleH2 = {
  textAlign: 'center',
  marginTop: '30px'
};

const styleImg = {
  display: 'block',
  margin: '0 auto',
  height: '400px'
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