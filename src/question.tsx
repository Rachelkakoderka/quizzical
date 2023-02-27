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
//console.log(props)

const {category, correct_answer, difficulty, incorrect_answers, question,type} = props.data;
const {isChecked} = props;

const [answersArr, setAnswersArr] = useState<Array<Answer>>([{text:"", id:"", isChosen:false}])
const [chosenAnswer, setChosenAnswer] = useState<string>("")
//const [keys, setKeys] = useState<string[]>([])
//const ref = useRef(null)

// function keysGen():void {
//   let arr = []; 
//   for (let i=0;i<4;i++){
//     arr.push(nanoid())
//   }
//   console.log("generated keys: ", arr )
//   return setKeys(arr);
//  }


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


function generateAnswersArr() : void {
    const randomNums = generateRandomNums();
   
    const allAnsw: string[] = [...incorrect_answers, correct_answer];
    const randomizedAnswers : string[] = randomNums.map((index) => decode(allAnsw[index]));

    let arr: any =[];
    randomizedAnswers.forEach((val, index)=> {
      arr.push({text:val, id: nanoid(), isChosen: false})
      })
       //console.log(arr)
    return setAnswersArr(arr);

}



function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) : void {
  e.preventDefault();
  // console.log(e.target, isChecked, chosenAnswer)
  let {id} = e.currentTarget;

  
  if (!isChecked) {

      setChosenAnswer(id);
      setAnswersArr(prevAnsArr => {
        let newArr =  prevAnsArr.map(
          (ansObj : Answer) => {
          ansObj.id === chosenAnswer ? {
            
            return {...ansObj, isChosen : true}} 
            : 
            return {...ansObj, isChosen: false}}
        )
        return newArr
     })
    console.log(answersArr)
  }
  
}

const answersElem = answersArr.map(
  (answ :any)=> {
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



useEffect(generateAnswersArr,[])
console.log("rerendered")

  return (
    <div className="question-block">
        <div className="question">{decode(question)} </div>
        <div className="answers-box">{ answersElem } </div>
       
    </div>
  )
}

