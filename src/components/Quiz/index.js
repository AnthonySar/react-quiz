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
  quizEnd: false,
  percent: null
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

  showToastMsg = pseudo => {
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
      maxQuestions,
      score,
      quizEnd
    } = this.state;

    if ((storedQuestions !== prevState.storedQuestions) && storedQuestions.length) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
      })
    }
   
    if ((idQuestion !== prevState.idQuestion) && storedQuestions.length) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        userAnswer: null,
        btnDisabled: true
      })
    }

    if (quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercentage(maxQuestions, score);
      this.gameOver(gradePercent)
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo)
    }
  };

  submitAnswer = (selectedAnswer) => {
      this.setState({
        userAnswer: selectedAnswer,
        btnDisabled: false
      })
  }

  getPercentage = (maxQ, ourScore) => (ourScore / maxQ) * 100; 

  gameOver = (percent) => {

    if (percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent
      })
    } else {
      this.setState({
        percent
      })
    }
  }

  loadLevelQuestions = param => {
    this.setState({...initialState, quizLevel: param})
    this.loadQuestions(levelNames[param])
  }

  render() {
    const {
      question,
      options,
      btnDisabled,
      userAnswer,
      quizEnd, 
      idQuestion,
      maxQuestions,
      score,
      quizLevel,
      percent
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
      <QuizOver
        ref={this.storeDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    )
    :
    (
      <>
        <ToastContainer />
        <Levels quizLevel={quizLevel} levelNames={levelNames}/>
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