import React from 'react'

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
        <img style={styleImg} alt='Error page' />
      </div>
    </div>
  )
}

export default ErrorPage