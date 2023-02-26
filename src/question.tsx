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
const [chosenAnswer, setChosenAnswer] = useState<string>("")
const [keys, setKeys] = useState<string[]>([])

function keysGen():void {
  let arr = []; 
  for (let i=0;i<5;i++){
    arr.push(nanoid())
  }
  return setKeys(arr);
 }

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

    keysGen();
    let arr:any = [];
    randomizedAnswers.forEach((val, index)=> {
      arr.push({text:val, id: keys[index] })
      })
       
    return setAnswersArr(arr);

}

useEffect(generateAnswersArr,[])
useEffect(keysGen, [])

function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) : void {
  e.preventDefault();
  console.log(e.target, isChecked, chosenAnswer)
  let {className, id} = e.currentTarget;

  if (!isChecked) {
    if (chosenAnswer === id) {
      console.log("odznaczam")
      e.currentTarget.className = "answer"
      setChosenAnswer("")
    } else if (!chosenAnswer) {
      console.log("zaznaczam")
      
      e.currentTarget.className = "answer checked"
      setChosenAnswer(id)
      console.log(e.currentTarget.id)
    }
   }
}

const answersElem = answersArr.map(
  (answ :any)=> {
      return (<div ref={ref} id={answ.id} key={answ.id} className="answer" onClick={(e) => handleClick(e)}>{answ.text}</div>)
});

  return (
    <div className="question-block">
        <div className="question">{decode(question)} </div>
        <div className="answers-box">{ answersElem } </div>
       
    </div>
  )
}

