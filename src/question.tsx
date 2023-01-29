import { useState } from "react"
import React from 'react'
import { QuestionInterface } from "./interfaces"
import { randomUUID } from "crypto"

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
    const randomizedAnswers : string[] = randomNums.map((index) => allAnsw[index]);
    
    return randomizedAnswers;

}

const answersElem = generateAnswersArr();

  return (
    <div className="question-block">
        <div className="question">{question} </div>
        <div className="answers">{ answersElem } </div>
       
    </div>
  )
}

