import React, {useEffect, useState} from 'react';


function Quiz() {

// const data = JSON.stringify(quiz)
// console.log(data);

const [questions, setQuestions] = useState({})

console.log(questions)

useEffect( () => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        .then(response => response.json())
        .then(quiz => setQuestions(quiz.results))
    }, [] )

  return (
    <div className="main">
        {/* {JSON.stringify(questions)} */}
        <h1>Quizzical</h1>
        <button className='btn start-game'>Start Quiz</button>
    </div>
  );
}

export default Quiz;
