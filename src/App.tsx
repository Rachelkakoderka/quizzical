import React, {useState, useEffect} from 'react';
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
  
  useEffect( () => {
          fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
          .then(response => response.json())
          .then(quiz => setQuestions(quiz.results))
          }, [] );
  
  
      //console.log(questions[0])
  const questionsElements : JSX.Element[] = questions.map((item) => (< Question data={item} isChecked={isChecked}/>));
  
    return (
      <div className="App">
      <div className="main">
        
       {/* {decode(questions[0].question)} */}
         {isStarted 
         ? 
         (<div className='game-board'>
         {questionsElements}
         <button className='btn in-game' onClick={() => setIsChecked(prevState=>!prevState)}>Check answers</button>
         </div>)       
         : 
         (<div className='initial-board'>
          <h1>Quizzical</h1>
          <h2>Test your general knowledge!</h2>
          <button className='btn start-game' onClick={()=> setIsStarted(true)}>Start Quiz</button>
          </div>)
          } 
      </div>
      </div>
    );
  }

export default App;
