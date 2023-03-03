import { useEffect, useState, useRef } from "react"
import React from 'react'
import { QuestionInterface, Answer } from "./interfaces"


interface Props {
    data : QuestionInterface,
    isChecked:boolean,
    isStarted:boolean,
    keyId: string
}

export default function Question( props : Props) {
  const {category, correct_answer, difficulty, incorrect_answers, question,type} = props.data;
  const {isChecked, keyId} = props;

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
      setChosenAnswer(id);
       
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
    }
  }

  function generateRandomNums() {
    
    const randomNumsArr : number[] = [];
    
    while (randomNumsArr.length<4) {
    let num = Math.floor(Math.random()*4)
    if (!(randomNumsArr.includes(num))){
      randomNumsArr.push(num);
    }
    }
  return randomNumsArr;
  }

  
    function generateAnswersArr() : [Answer] {
      const randomNums = generateRandomNums();
        const allAnsw: string[] = [...incorrect_answers, correct_answer];
        const randomizedAnswers : string[] = randomNums.map((index) => allAnsw[index]);
        
        let arr: any =[];
        randomizedAnswers.forEach((val, index)=> {
          arr.push({text:val, id: keyId+index, isChosen: false})
          })
          
        return arr;
    }

 

  const answersElem = answersArr.map(
      (answ :any)=> {return (<div 
                      id={answ.id} 
                      key={answ.id} 
                      className={  (isChecked)
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

    useEffect(() =>{
      setAnswersArr(generateAnswersArr())    
    },[question])
    
  
  console.log("Question component rendered")
  console.log(answersElem)

  return (
      <div className="question-block">
        <div className="question">{(question)} </div>
        <div className="answers-box">{ answersElem } </div>
      </div>
   )
  }

