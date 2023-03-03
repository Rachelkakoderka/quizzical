import {useState, useEffect, SyntheticEvent} from 'react';
import './App.css';
import {QuestionInterface} from "./interfaces"
import Question from './question';
import { decode } from 'html-entities';



function App() {

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionInterface[]>([{category: "",
      correct_answer: "",
      difficulty: "",
      incorrect_answers: [""],
      question:"", 
      type:""}]);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  
   
    
  const questionsElements : JSX.Element[] = questions.map((item,index) => 
  (< Question key={`question ${index}`} keyId={`question${index}`} data={item} isChecked={isChecked} isStarted={isStarted}/>));
  

  function startGame() {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
      .then(response =>response.json())
      .then(quiz => 
        { let newQuestions = quiz.results.map((qSet: QuestionInterface) => (
            {...qSet,
              correct_answer: decode(qSet.correct_answer),
              incorrect_answers: qSet.incorrect_answers.map((oneAns : string) => decode(oneAns)),
              question: decode(qSet.question)
            }))
        return setQuestions(newQuestions)})
  
      setIsStarted(true)
    }

    console.log("App component rendered")

    useEffect( () => setIsChecked(false)
    ,[questions])
   

    return (
      <div className="App">
      <div className="main">
        
       
         {isStarted && questions[0].category
         ? 
         (<div className='game-board'>
            {questionsElements}
            <div className='btn-box'>
              
              <button className={isChecked ? 'btn in-game hidden' : 'btn in-game '}  onClick={(e) => {
                setIsChecked(true)}}>Check answers</button>

              <p>{/* {isChecked ? "You scored: " : "" } */}</p>

              <button className={isChecked ? 'btn after-game' : 'btn after-game hidden'} onClick={startGame}>Play again</button>  

          
            </div>
         </div>)

         : 
         (<div className='initial-board'>
          <h1>Quizzical</h1>
          <h2>Test your general knowledge!</h2>
          <button className='btn start-game' onClick={startGame}>Start Quiz</button>
          </div>)
          } 
      </div>
      </div>
    );
  }

export default App;
