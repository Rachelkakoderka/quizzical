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
    const randomNums= [];
    for (let i=0; i<4; i++) {
         randomNums.push(Math.floor(Math.random()*3));
    }
    const allAnsw: string[] = [...incorrect_answers, correct_answer];
    const randomizedAnswers : string[] = randomNums.map((index) => decode(allAnsw[index]));
    
    return randomizedAnswers;

}

const answersElem = generateAnswersArr().map(
  (answ)=> {
      return (<div className="answer">{answ}</div>)
});

  return (
    <div className="question-block">
        <div className="question">{decode(question)} </div>
        <div className="answers-box">{ answersElem } </div>
       
    </div>
  )
}

