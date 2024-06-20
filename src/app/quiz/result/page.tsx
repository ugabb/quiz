"use client"

import AnswerCard from '@/app/components/AnswerCard';
import { useQuiz } from '@/lib/quizState';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {}

const QuizResult = (props: Props) => {
  const { userAnswers, questions, reset, score } = useQuiz()
  const router = useRouter()

  return (
    <div className='flex flex-col items-center gap-5 justify-center my-20'>
      <h1 className='text-3xl font-bold'>Resultados!</h1>
      <div className='flex flex-col items-center gap-5 justify-center'>
        <div className="card w-96 h-96 bg-base-100">
          <div className="card-body justify-between items-center">
            <h2 className="card-title text-zinc-500">Seu Resultado!</h2>
            <div className="radial-progress text-accent" style={{ "--value": score / questions.length * 100, "--size": "12rem" }} role="progressbar">
              {Math.floor(score / questions.length * 100)}%
            </div>
            <p>{score}/{questions.length}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => {
                router.push('/quiz')
                reset()
              }}>Recomeçar</button>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center'>
          {questions.map((question, index) => (
            <AnswerCard
              options={question.options}
              question={question.question}
              userAnswer={userAnswers[index]}
              correctAnswer={question.correctAnswer}
            />
          ))}
        </div>


      </div>
    </div>
  )
}

export default QuizResult