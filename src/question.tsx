import { useEffect, useState, useRef } from "react"
import React from 'react'
import { QuestionInterface } from "./interfaces"
import { randomUUID } from "crypto"
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

const [answersArr, setAnswersArr] = useState<string[]>([])
const [chosenAnswer, setChosenAnswer] = useState<string>("nie ma")

function keysGen():string[] {
  let arr = []; 
  for (let i=0;i<5;i++){
    arr.push(nanoid())
  }
  return arr;
 }

const keys = keysGen()
const ref = useRef(null)

function generateAnswersArr() : void {
    const randomNums : number[] = [];
    
     while (randomNums.length<4) {
      let num = Math.floor(Math.random()*4)
      if (!(randomNums.includes(num))){
        randomNums.push(num);
      }
    }
    //console.log(randomNums)
    const allAnsw: string[] = [...incorrect_answers, correct_answer];
    const randomizedAnswers : string[] = randomNums.map((index) => decode(allAnsw[index]));
    //console.log(randomizedAnswers)

     
    return setAnswersArr(randomizedAnswers);

}

useEffect(generateAnswersArr,[])

function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) : void {
  e.preventDefault();
  console.log(e.target, ref.current.className)
  let {className, id} = e.currentTarget;

  

   if (!isChecked) {
    if (chosenAnswer === id) {
      console.log("odznaczam")
      className = "answer"
    } else {
      console.log("zaznaczam")
      
      e.currentTarget.className = "answer checked"
      setChosenAnswer(prevState => id)
      console.log(e.currentTarget.className)
    }
    //   if (className === "answer") { 
    //     console.log(e.currentTarget.className)
    //     e.currentTarget.className = "answer checked"
    //     setChosenAnswer(id)
    //   } else {
    //     e.currentTarget.className = 
    //   }
    // } else {

    // }   
}
}

const answersElem = answersArr.map(
  (answ :any)=> {
      return (<div ref={ref} id={nanoid()} key={nanoid()} className="answer" onClick={(e) => handleClick(e)}>{answ}</div>)
});

  return (
    <div className="question-block">
        <div className="question">{decode(question)} </div>
        <div className="answers-box">{ answersElem } </div>
       
    </div>
  )
}

