"use client"
import { useQuiz } from "@/lib/quizState"
import { useEffect, useState } from "react"

type Timeout = ReturnType<typeof setInterval>

const Quiz = () => {
    const [isQuizEnable, setIsQuizEnable] = useState(true)
    const [timer, setTimer] = useState(60 * 4) // 60 seconds timer
    const { score, questions, currentQuestionIndex, setAnswer, removeAnswer, nextQuestion, backQuestion, userAnswers, calculateScore, reset } = useQuiz()


    useEffect(() => {
        let interval: Timeout;
        if (isQuizEnable) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev > 0) return prev - 1
                    clearInterval(interval)
                    calculateScore()
                    setIsQuizEnable(false)
                    return 0
                })
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [isQuizEnable])

    return (
        <div className="min-h-screen flex justify-center items-center">
            {isQuizEnable && (
                <div className="flex flex-col gap-5 w-[600px]">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Question {currentQuestionIndex + 1}</h1>
                        <h2 className="text-xl">Time left: {timer} seconds</h2>
                    </div>
                    <h1 className="">{questions[currentQuestionIndex].question}</h1>
                    <div className="flex flex-col gap-3">
                        {questions[currentQuestionIndex].options.map((option, index) => {
                            const isSelected = userAnswers[currentQuestionIndex] === index;
                            return (
                                <button
                                    key={index}
                                    className={`btn  ${isSelected ? "btn-primary text-white" : "btn-neutral"}`}
                                    onClick={() => {
                                        if (isSelected) {
                                            removeAnswer(currentQuestionIndex)
                                        } else {
                                            setAnswer(currentQuestionIndex, index)
                                        }
                                    }}
                                >
                                    {option}
                                </button>
                            )
                        })}
                    </div>
                    <div className="flex gap-1 justify-between">
                        <button className="btn btn-neutral w-fit" onClick={backQuestion} disabled={currentQuestionIndex <= 0 ? true : false}>Back</button>
                        <button className="btn btn-neutral w-fit" onClick={nextQuestion} disabled={currentQuestionIndex >= questions.length - 1 ? true : false} >Next</button>
                    </div>

                    {currentQuestionIndex === questions.length - 1 && <button className="btn btn-accent text-white" onClick={() => {
                        calculateScore()
                        setIsQuizEnable(false)
                    }} disabled={userAnswers.includes(undefined) || userAnswers.length === 0 || userAnswers.length < 10}>Finish!</button>}
                </div >
            )}

            {!isQuizEnable && (
                <div className="flex flex-col gap-5 justify-center items-center">
                    <h1 className="text-5xl font-bold text-accent">Your Score is {score} 🎉</h1>
                    <button className="btn btn-neutral" onClick={() => {
                        setIsQuizEnable(true)
                        reset()
                        setTimer(5)
                    }}>Reset</button>
                </div>
            )}
        </div >
    )
}

export default Quiz