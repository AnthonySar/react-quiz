import React, { useState, useEffect } from 'react'
import Loader from '../Loader';

const QuizOver = React.forwardRef((props, ref) => {

  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions
  } = props;

  const [asked, setAsked] = useState([]); 
  useEffect(() => {
    setAsked(ref.current)
  }, [ref])


  const averageGrade = maxQuestions / 2;

  if (score < averageGrade) {
    setTimeout(() => {
      loadLevelQuestions(quizLevel)
    }, 3000)  
  }

  const decision = score >= averageGrade ? (
    <>
      <div className='stepsContainer'>
      {
        quizLevel < levelNames.length ? 
        (        
          <>
          <p className='successMsg'>Bien joué ! Passez au prochain niveau</p>
          <button 
            className='btnResult success'
            onClick={() => loadLevelQuestions(quizLevel)}
          >
              Niveau suivant
          </button>
          </>
        ) 
        : 
        (
          <>
          <p className='successMsg'>Vous êtes le boss !</p>
          <button 
            lassName='btnResult'
            onClick={() => loadLevelQuestions(0)}
          >
            Retour à l'acceuil
          </button>
          </>
        )
      }
      </div>
      <div className='percentage'>
        <div className='progressPercent'>Réussite : {percent} %</div>
        <div className='progressPercent'>Note {score}/{maxQuestions}</div>
      </div>
    </>
  ) 
  : 
  (
    <>
      <div className='stepsBtnContainer'>
        <p className='failureMsg'>Dommage ! C'est raté</p>
      </div>
      <div className='percentage'>
        <div className='progressPercent'>Réussite : {percent} %</div>
        <div className='progressPercent'>Note {score}/{maxQuestions}</div>
      </div>
    </>
  );

   const questionsAnswers = score >= averageGrade ? (
    asked.map((question) => {
      return (
        <tr key={question.id}>
          <td>{question.question}</td>
          <td>{question.answer}</td>
          <td><button className='btnInfo'>Infos</button></td>
        </tr>
      )
    })
  )
  : 
  (
    <tr>
      <td colSpan="3">
        <Loader />
      </td>
    </tr>
  )


  return (
    <>
      { decision }
      <hr />
      <p>Réponses aux questions </p>
      <div className='answerContainer'>
        <table className='answers'>
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>
            { questionsAnswers }
          </tbody>
        </table>
      </div>
    </>
  )
})

export default React.memo(QuizOver);