import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { QuizApi } from '../QuizApi';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import QuizOver from '../QuizOver';

const initialState = {
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  question: null,
  options: [],
  idQuestion: 0,
  btnDisabled: true,
  userAnswer: null,
  score: 0,
  showWelcomeMsg: false,
  quizEnd: false
}

const levelNames = ['debutant', 'confirme', 'expert'];

class Quiz extends Component {

  constructor(props) {
    super(props)
    this.state = initialState;
    this.storeDataRef = React.createRef();
  }

  loadQuestions = (quiz) => {
    const fetchedQuiz = QuizApi[0].quiz[quiz];
    if (fetchedQuiz.length >= this.state.maxQuestions) {

      this.storeDataRef.current = fetchedQuiz;

      const newArray = fetchedQuiz.map(({answer, ...keepRest}) => keepRest);

      this.setState({
        storedQuestions: newArray
      })
    }
  }

  showWelcomeMsg = pseudo => {
    if (!this.state.showWelcomeMsg) {
      this.setState({ showWelcomeMsg: true })
      
      toast(`Bienvenue ${pseudo}, et bonne chance!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  }

  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizLevel]);
  };

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.setState({quizEnd: true })
    } else {
      this.setState(prevState => ({
        idQuestion: prevState.idQuestion + 1,
      }))
    }
    
    const goodAnswer = this.storeDataRef.current[this.state.idQuestion].answer;
  
    if (this.state.userAnswer === goodAnswer) {
     this.setState(prevState => ({
        score: prevState.score + 1
      }));

      toast.success('Bonne réponse !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
      });
    } else {
      toast.error('Oups, raté !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light'
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      storedQuestions,
      idQuestion,
    } = this.state;

    if (storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
      })
    }
   
    if (idQuestion !== prevState.idQuestion) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        userAnswer: null,
        btnDisabled: true
      })
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showWelcomeMsg(this.props.userData.pseudo)
    }
  };

  submitAnswer = (selectedAnswer) => {
      this.setState({
        userAnswer: selectedAnswer,
        btnDisabled: false
      })
  }

  gameOver = () => {
    this.setState({
      quizEnd: true
    })
  }

  render() {
    const {
      question,
      options,
      btnDisabled,
      userAnswer,
      quizEnd, 
      idQuestion,
      maxQuestions
    } = this.state;
    
    const displayOptions = options.map((option, index) => {
      return (
        <p 
          key={index} 
          className={`answerOptions ${userAnswer === option ? 'selected' : ''}`}
          onClick={() => this.submitAnswer(option)} 
        >
          {option}
        </p>
      )
    })

    return quizEnd ? (
      <QuizOver />
    )
    :
    (
      <>
        <ToastContainer />
        <Levels />
        <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions}/>

        <h2>{question}</h2>

        { displayOptions }

        <button 
          disabled={btnDisabled} 
          className='btnSubmit'
          onClick={this.nextQuestion}
        >
          { idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
      </button>
      </>
    )
  }
}

export default Quiz