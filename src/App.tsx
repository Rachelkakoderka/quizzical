import {useState, useEffect, SyntheticEvent} from 'react';
import './App.css';
import {QuestionInterface} from "./interfaces"
import Question from './question';
import { nanoid } from 'nanoid';


function App() {

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionInterface[]>([{category: "",
      correct_answer: "",
      difficulty: "",
      incorrect_answers: [""],
      question:"", 
      type:""}]);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  
   
  //console.log(questions)
      
  const questionsElements : JSX.Element[] = questions.map((item,index) => (< Question key={index} data={item} isChecked={isChecked}/>));
  

  function startGame(e:SyntheticEvent) {
    e.preventDefault()
    setIsStarted(true);
    
    }

    console.log("App component rendered")

    useEffect(() => {
      if (isStarted)
      {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        .then(response =>response.json())
        .then(quiz => setQuestions(quiz.results))
      }},
      [isStarted])

    return (
      <div className="App">
      <div className="main">
        
       
         {isStarted 
         ? 
         (<div className='game-board'>
         {questions[0].category ? questionsElements : ""}
         
         {isChecked ? 
            <button className='btn after-game' onClick={() => {
              setIsStarted(false)
              setIsChecked(false)
            }}>Play again</button>
          :
            <button className='btn in-game' onClick={(e) => {
              setIsChecked(true)}}>Check answers</button>
          }
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
