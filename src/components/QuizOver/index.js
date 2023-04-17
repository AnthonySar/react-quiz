import React, { useState, useEffect } from 'react'
import Loader from '../Loader';
import Modal from '../Modal';
import axios from 'axios';

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
  const [openModal, setOpenModal] = useState(false); 


  useEffect(() => {
    setAsked(ref.current)
  }, [ref])

  const showModal = (id) => {
    setOpenModal(true)
      console.log(id)

    axios
    .get(`https://pokebuildapi.fr/api/v1/pokemon/${id}`)
    .then((response) => {
      console.log(response)
      console.log(id)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const hideModal = (id) => {
    setOpenModal(false)
  }

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
          <td>
            <button 
              className='btnInfo'
              onClick={() => showModal(question.pokeId)}
            >
              Infos
            </button>
          </td>
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
      
      <Modal showModal={openModal} hideModal={hideModal}>
        <div className='modalHeader'>
          <h2>Title</h2>
        </div>
        <div className='modalBody'>
          <p>Yo</p>
        </div>
        <div className='modalFooter'>
          <button className='modalBtn'>X</button>
        </div>
      </Modal>
    </>
  )
})

export default React.memo(QuizOver);