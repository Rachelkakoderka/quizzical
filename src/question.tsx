import { useEffect, useState, useRef } from "react"
import React from 'react'
import { QuestionInterface, Answer } from "./interfaces"
import { decode } from 'html-entities';
import { nanoid } from "nanoid";

interface Props {
    data : QuestionInterface,
    isChecked:boolean
}

export default function Question( props : Props) {
  const {category, correct_answer, difficulty, incorrect_answers, question,type} = props.data;
  const {isChecked} = props;

  //State
  const [answersArr, setAnswersArr] = useState<Array<Answer>>(
  [{
      text:"",
      id: "",
      isChosen: false
    }
  ])
  const [chosenAnswer, setChosenAnswer] = useState<string>("")


 function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) : void {
    e.preventDefault();
    let {id} = e.currentTarget;
    
    if (!isChecked) {
      console.log(chosenAnswer);
      setChosenAnswer(id);
      console.log(chosenAnswer);
  
      setAnswersArr(prevAnsArr => {
          let newArr =  prevAnsArr.map(
            (ansObj : Answer) => {
              if (ansObj.id === id) {
                console.log(chosenAnswer)
                return {...ansObj, isChosen : true}
              }else {
                return {...ansObj, isChosen: false}
              } 
            }
          );
          return newArr
        }
        );
     //console.log(answersArr)
    }
  }

  function generateRandomNums() {
    const randomNums : number[] = [];
    
    while (randomNums.length<4) {
    let num = Math.floor(Math.random()*4)
    if (!(randomNums.includes(num))){
      randomNums.push(num);
    }
    }
  return randomNums;
  }

  
    function generateAnswersArr() : [Answer] {
        const randomNums = generateRandomNums();
      
        const allAnsw: string[] = [...incorrect_answers, correct_answer];
        const randomizedAnswers : string[] = randomNums.map((index) => decode(allAnsw[index]));
        
        let arr: any =[];
        randomizedAnswers.forEach((val, index)=> {
          arr.push({text:val, id: nanoid(), isChosen: false})
          })
          console.log("New set of answers generated")
        return arr;
    }

 

  const answersElem = answersArr.map(
      (answ :any)=> {
        console.log(answersArr)
          return (<div 
                      id={answ.id} 
                      key={answ.id} 
                      className={ isChecked 
                        ? 
                        (answ.isChosen ? 
                            ( answ.text === correct_answer ? "correct answer" : "incorrect answer")
                            :
                            (answ.text === correct_answer ? "correct answer" : "answer")
                        ) 
                        :
                        ( answ.isChosen ?
                          "answer checked" :
                          "answer"
                        )                   
                      }
                      onClick={(e) => handleClick(e)}>
                      {answ.text}</div>)
    });

    useEffect(() =>{setAnswersArr(generateAnswersArr)},[])
  
  console.log("Question component rendered")

  return (
    <div className="question-block">
      <div className="question">{decode(question)} </div>
       <div className="answers-box">{ answersElem } </div>
       
    </div>
  )

}

