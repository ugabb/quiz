"use client"

import { useQuiz } from '@/lib/quizState';
import React from 'react'

type Props = {}

const QuizResult = (props: Props) => {
    const {userAnswers} = useQuiz()
    console.log({userAnswers});
    
  return (
    <div>QuizResult</div>
  )
}

export default QuizResult