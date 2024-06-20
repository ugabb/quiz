import React from 'react'

type Props = {
    question: string
    options: string[];
    correctAnswer: number;
    userAnswer: number | undefined;
}

const AnswerCard = ({ options, question, userAnswer, correctAnswer }: Props) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{question}</h2>
                {options.map((option, index) => (
                    <button
                        key={index}
                        className={`btn ${userAnswer !== undefined && index === correctAnswer ? "bg-accent text-white" : ""} ${userAnswer !== undefined && index === userAnswer && index !== correctAnswer ? "bg-red-500 text-white" : ""}`}
                    >
                        {option}
                    </button>))}
            </div>
        </div>
    )
}

export default AnswerCard