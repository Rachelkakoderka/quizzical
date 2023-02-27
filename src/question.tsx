import { useEffect, useState, useRef } from "react"
import React from 'react'
import { QuestionInterface } from "./interfaces"
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

const [answersArr, setAnswersArr] = useState<[{}]>([{}])
const [chosenAnswer, setChosenAnswer] = useState<string[]>([""
])
const [keys, setKeys] = useState<string[]>([])
const ref = useRef(null)

function keysGen():void {
  let arr = []; 
  for (let i=0;i<4;i++){
    arr.push(nanoid())
  }
  console.log("generated keys: ", arr )
  return setKeys(arr);
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


function generateAnswersArr() : void {
    const randomNums = generateRandomNums();
   
    const allAnsw: string[] = [...incorrect_answers, correct_answer];
    const randomizedAnswers : string[] = randomNums.map((index) => decode(allAnsw[index]));

    let arr:any = [];
    randomizedAnswers.forEach((val, index)=> {
      arr.push({text:val, id: nanoid(), isChosen: false})
      })
       console.log(arr)
    return setAnswersArr(arr);

}



function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) : void {
  e.preventDefault();
  console.log(e.target, isChecked, chosenAnswer)
  let {className, id} = e.currentTarget;

    
  if (!isChecked) {
    setChosenAnswer([id]});
  } else {
      console.log("zaznaczam")
    
      //setAnswersArr(prevAnswersArr => { prevAnswersArr.map(answ => {answ.id === id ? ({...answ, isChecked:true}) : answ} )})
      setChosenAnswer([id])
      console.log(e.currentTarget.id)
    }
  
}

function showCorrectAns() {
  console.log(answersArr)
  
}


const answersElem = answersArr.map(
  (answ :any)=> {
      return (<div ref={ref} 
                   id={answ.id} 
                   key={answ.id} 
                   className={answ.isChosen ? "checked answer" : "answer"}
                    
                   onClick={(e) => handleClick(e)}>
                  {answ.text}</div>)
});


useEffect(generateAnswersArr,[])
//useEffect(showCorrectAns, [isChecked])

  return (
    <div className="question-block">
        <div className="question">{decode(question)} </div>
        <div className="answers-box">{ answersElem } </div>
       
    </div>
  )
}

