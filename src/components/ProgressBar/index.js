import React from 'react'

const ProgressBar = ({idQuestion, maxQuestions}) => {

  const getPercent = (totalQ, questionId) => {
    return (100 / totalQ) * questionId;
  }
  const actualQ = idQuestion + 1;
  const progressPercent = getPercent(maxQuestions, actualQ);

  return (
    <>
      <div className='percentage'>
        <div className='progressPercent'>Question : {idQuestion + 1}/{maxQuestions}</div>
        <div className='progressPercent'>Progression : {progressPercent}%</div>
      </div>
      <div className='progressBar'>
        <div className='progressBarChange' style={{width: `${progressPercent}%`}}></div>
      </div>
    </>
  )
}

export default React.memo(ProgressBar)