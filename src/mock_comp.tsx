
// const {category, correct_answer, difficulty, incorrect_answers, question,type} = props.data;
// const {isChecked} = props;

// const [answersArr, setAnswersArr] = useState<Array<Answer>>([{text:"", id:"", isChosen:false}])
// const [chosenAnswer, setChosenAnswer] = useState<string>("")


// function generateRandomNums() {
//   const randomNums : number[] = [];
    
//   while (randomNums.length<4) {
//    let num = Math.floor(Math.random()*4)
//    if (!(randomNums.includes(num))){
//      randomNums.push(num);
//    }
//  }
//  return randomNums;
// }


// function generateAnswersArr() : void {
//     const randomNums = generateRandomNums();
   
//     const allAnsw: string[] = [...incorrect_answers, correct_answer];
//     const randomizedAnswers : string[] = randomNums.map((index) => decode(allAnsw[index]));
//     console.log(question, "Odpowiedzi:  ", allAnsw)

//     let arr: any =[];
//     randomizedAnswers.forEach((val, index)=> {
//       arr.push({text:val, id: nanoid(), isChosen: false})
//       })
//        //console.log(arr)
//     return setAnswersArr(arr);

// }



// function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) : void {
//   e.preventDefault();
//   let {id} = e.currentTarget;
  
//   if (!isChecked) {
//     console.log(chosenAnswer);
//     setChosenAnswer(id);
//     console.log(chosenAnswer);

//     setAnswersArr(prevAnsArr => {
//         let newArr =  prevAnsArr.map(
//           (ansObj : Answer) => {
//             if (ansObj.id === id) {
//               console.log(chosenAnswer)
//               return {...ansObj, isChosen : true}
//             }else {
//               return {...ansObj, isChosen: false}
//             } 
//           }
//         );
//         return newArr
//       }
//       );
//    //console.log(answersArr)
//   }
  
// }
// useEffect(generateAnswersArr,[])
// console.log("question component rendered")

// const answersElem = answersArr.map(
//   (answ :any)=> {
//       return (<div 
//                   id={answ.id} 
//                   key={answ.id} 
//                   className={ isChecked 
//                     ? 
//                     (answ.isChosen ? 
//                         ( answ.text === correct_answer ? "correct answer" : "incorrect answer")
//                         :
//                         (answ.text === correct_answer ? "correct answer" : "answer")
//                     ) 
//                     :
//                     ( answ.isChosen ?
//                       "answer checked" :
//                       "answer"
//                     )                   
//                   }
//                   onClick={(e) => handleClick(e)}>
//                   {answ.text}</div>)
// });
// //console.log(question," + ",  correct_answer, " + ", incorrect_answers,)
//   return (
//     <div className="question-block">
//         <div className="question">{decode(question)} </div>
//         <div className="answers-box">{ answersElem } </div>
       
//     </div>
//   )
export{}