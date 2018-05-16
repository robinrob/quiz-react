import { RefObject } from "react"

import { answerQuestion } from "./actions";
import Quiz from "./components/Quiz";

declare global {
  interface Window { quiz: { store: any } }
}

interface Observable {
  subscribe: Function
}

export interface AnswerObject {
  id: any,
  text: string
}

export interface QuestionObject {
  id: string,
  title: string,
  multiple_choice_answers: AnswerObject[]
}

export interface AnsweredQuestionObject extends QuestionObject {
  user_answer: AnswerObject
}

export interface QuizObject {
  id: string,
  name: string
}

interface HistoryObject {
  push: Function
}

export interface AnswerProps {
  keyPressedObservable: Observable,
  currentAnswer: AnswerObject,
  updateAnswer: Function,
  answer: AnswerObject,
  index: number
}

export interface QuestionProps {
  name: string
  quiz: QuizObject
  currentQuestion: QuestionObject
  questions: QuestionObject[]
  nextURL: Function
  answerQuestion: Function
  keyPressedObservable: Observable
  history: HistoryObject
}

export interface QuestionState {
  answer: object
}

export interface NextButtonProps {
  shouldFocus: boolean
  toURL: Function
  isDisabled: Function
  onNext: Function
  onClick: Function
  history: HistoryObject
}

export interface NextButtonState {
  button: RefObject<HTMLButtonElement>
  onClick: Function
}

export interface QuizOptionProps {
  setQuiz: Function
  quiz: QuizObject
  quizOption: QuizObject
}

export interface QuizProps {
  name: string
  quiz: QuizObject
  nextURL: Function
  questions: QuestionObject[]
  loadQuestions: Function
}

export interface MenuProps {
  updateName: Function
  setQuiz: Function
  name: string
  quiz: QuizObject
}

export interface MenuState {
  quizzes: QuizObject[],
  nameInputRef: RefObject<HTMLInputElement>
}

export interface ResultsProps {
  name: string
  resetQuiz: Function
  answered_questions: AnsweredQuestionObject[]
  reset_quiz: Function
  quiz: QuizObject
}

export interface ResultsState {
  score: Number
}
