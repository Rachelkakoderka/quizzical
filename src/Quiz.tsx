import React, {useEffect, useState} from 'react';
import { QuestionInterface } from './interfaces';
import Question from './question';

function Quiz() {

const [isStarted, setIsStarted] = useState<boolean>(false);
const [questions, setQuestions] = useState<QuestionInterface[]>([{category: "",
    correct_answer: "",
    difficulty: "",
    incorrect_answers: [""],
    question:"", 
    type:""}]);

useEffect( () => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        .then(response => response.json())
        .then(quiz => setQuestions(quiz.results))
    }, [] );


    //console.log(questions[0])
const questionsElements : JSX.Element[] = questions.map((item) => (< Question data={item} />));

  return (
    <div className="main">
       {isStarted 
       ? 
       (<div className='game-board'>
       {questionsElements}
       </div>)       
       : 
       (<div className='initial-board'>
        <h1>Quizzical</h1>
        <h2>Test your general knowledge!</h2>
        <button className='btn start-game' onClick={()=> setIsStarted(true)}>Start Quiz</button>
        </div>)
        } 
    </div>
  );
}

export default Quiz;
