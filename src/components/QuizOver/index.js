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
  const [characterData, setCharacterData] = useState([]);
  const [characterLoading, setCharacterLoading] = useState(true);

  useEffect(() => {
    setAsked(ref.current);

    if (localStorage.getItem('characterStorageDate')) {
      const date = localStorage.getItem('characterStorageDate');
      checkCharacterAge(date)
    }
  }, [ref]);

  /**
   * @description On vérifie si la date est +/- vieille de 15 jours
   * @param {*} date 
   */
  const checkCharacterAge = (date) => {
    const today = Date.now();
    const timeDiff = today - date;
    // La différence entre la date de la date en localStorage / 1 minutes * 360 secondes * 24 heures
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff >= 15) {
      localStorage.clear();

      localStorage.setItem('characterStorageDate', Date.now());
    }
  }

  const showModal = (id) => {
    setOpenModal(true)

    /**
     * IF : Vérifie si le call API a déjà été effectué
     * Dans ce cas, on lui envoi l'ID sous forme de string
     * ElSE : On passe au call API pour récupérer les données
     * Que l'on stock en local : Optimisation des calls API 
     */
    if ( localStorage.getItem(id) ) {

        setCharacterData(JSON.parse(localStorage.getItem(id)));
        setCharacterLoading(false);

    } else {

      axios
      .get(`https://pokebuildapi.fr/api/v1/pokemon/${id}`)
      .then((response) => {
        console.log(response)
        console.log(id)
        setCharacterData(response.data);
        setCharacterLoading(false);

        localStorage.setItem(id, JSON.stringify(response.data));
        if ( !localStorage.getItem('characterStorageDate') ) {
          localStorage.setItem('characterStorageDate', Date.now());
        }
      })
      .catch((error) => {console.log(error)})    

    }

  }

  const hideModal = (id) => {
    setOpenModal(false)
    setCharacterLoading(true)
  }

  const averageGrade = maxQuestions / 2;

  if (score < averageGrade) {
    setTimeout(() => {
      loadLevelQuestions(quizLevel)
    }, 3000)  
  }

  const decision = score >= averageGrade ? (
    <>
      <div className='stepsBtnContainer'>
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

  /**
   * @description Affichage des data de la modal
   */
  const resultInModal = !characterLoading ? 
    (
      <>
      <div className='modalHeader'>
      {
        characterData.name ? <h2>{characterData.name}</h2> : <h2>Jaqen H'ghar ? C'est bien toi ?!</h2>
      } 
      </div>
      <div className='modalBody'>
        <div className='modalImage'>
         {
          characterData.image ? <img src={characterData.image} alt={`Portrait de `+characterData.name} /> : ""
         } 
        </div>
        <div className='modalCard'>
          <div className='modalCardBody'>
          {
            characterData.name || characterData.stats.HP ? 
              <div className='modalCardHeader'>
                <span>{characterData.name}</span>
                <span>{characterData.stats.HP}HP</span>
              </div> : ""
          }
          {
              characterData.sprite ?
                <div className='modalCardPicture'>
                  <img src={characterData.sprite} alt={`Pixel de `+characterData.name} />
                </div> : ""
            }

            {
              characterData.pokedexId ? <div className='modalCardDetails'><p>Pokédex N°<span>{characterData.pokedexId}</span></p></div> : ""
            }

            {
              characterData.stats.attack || characterData.stats.defense || characterData.stats.special_attack || characterData.stats.special_defense || characterData.stats.speed ?
                <div className='modalStats'>
                  <div>
                    <p>Points d'attaque : <span>{characterData.stats.attack}</span></p>
                    <p>Points de défense : <span>{characterData.stats.defense}</span></p>
                    <p>Attaque Spé. : <span>{characterData.stats.special_attack}</span></p>
                    <p>Défense Spé. : <span>{characterData.stats.special_defense}</span></p>
                    <p>Vitesse : <span>{characterData.stats.speed}</span></p>
                  </div>
                </div> : "" 
              } 
            </div>
          </div>
        </div>
        <div className='modalFooter'>
          <button className='modalBtn'  onClick={hideModal}>X</button>
        </div>
        </>
      ) 
      :
      (
        <>
          <div className='modalBody'>
            <Loader />
          </div>
        </>
      )
    ; 
    /* Fin d'affichage Modal */

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
        { resultInModal }
      </Modal>
    </>
  )
})

export default React.memo(QuizOver);