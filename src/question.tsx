import { useState } from "react"
import React from 'react'
import { QuestionInterface } from "./interfaces"
import { randomUUID } from "crypto"
import { decode } from 'html-entities';

interface Props {
    data : QuestionInterface
}

export default function Question( props : Props) {
console.log(props)

const {category, correct_answer, difficulty, incorrect_answers, question,type} = props.data;

function generateAnswersArr() : string[] {
    const randomNums : number[] = [];
    
     while (randomNums.length<4) {
      let num = Math.floor(Math.random()*4)
      if (!(randomNums.includes(num))){
        randomNums.push(num);
      }
    }
    console.log(randomNums)
    const allAnsw: string[] = [...incorrect_answers, correct_answer];
    const randomizedAnswers : string[] = randomNums.map((index) => decode(allAnsw[index]));
    
    return randomizedAnswers;

}

const answersElem = generateAnswersArr().map(
  (answ :any)=> {
      return (<div className="answer">{answ}</div>)
});

  return (
    <div className="question-block">
        <div className="question">{decode(question)} </div>
        <div className="answers-box">{ answersElem } </div>
       
    </div>
  )
}

