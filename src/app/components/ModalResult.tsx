import React from 'react'
import AnswerCard from './AnswerCard'
import { useQuiz } from '@/lib/quizState'
import { tableItems } from '../dashboard/mock-table-data';

interface ModalResultProps {
    userId: number;
}

const ModalResult = ({ userId }: ModalResultProps) => {
    const { userAnswers, questions, reset, score, calculateScore } = useQuiz()

    const currentUserAnswers = tableItems.find((item) => item.id === userId)?.userAnswers
    const currentUser = tableItems.find((item) => item.id === userId)
    const currentUserScore = questions.reduce((acc, question, index) => {
        if (currentUserAnswers?.[index] === question.correctAnswer) {
            return acc + 1;
        }

        return acc;
    }, 0)

    console.log(currentUserAnswers)

    return (
        <div className='flex flex-col items-center gap-5 justify-center my-20'>
            <h1 className='text-3xl font-bold'>Resultados!</h1>
            <div className='flex flex-col items-center gap-5 justify-center'>
                <div className="card w-96 h-96 bg-base-100">
                    <div className="card-body flex justify-between items-center">
                        <h2 className="card-title font-normal text-zinc-400 text-center mb-5">{currentUser?.cliente}</h2>

                        {/* @ts-ignore */}
                        <div className="radial-progress text-emerald-500" style={{ "--value": currentUserScore / questions.length * 100, "--size": "12rem" }} role="progressbar">
                            {Math.floor(currentUserScore / questions.length * 100)}%
                        </div>
                        <p>{currentUserScore}/{questions.length}</p>

                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    {questions.map((question, index) => (
                        <AnswerCard
                            key={index}
                            options={question.options}
                            question={question.question}
                            userAnswer={currentUserAnswers?.[index] ?? undefined}
                            correctAnswer={question.correctAnswer}
                        />
                    ))}
                </div>


            </div>
        </div >
    )
}

export default ModalResult