export interface QuestionInterface {
    category: string,
    correct_answer:string,
    difficulty: string,
    incorrect_answers: string[],
    question:string, 
    type:string
}

export interface Answer {
    text:string;
    id: string;
    isChosen: boolean

}