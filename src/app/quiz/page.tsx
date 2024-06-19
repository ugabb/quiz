"use client"
import { useQuiz } from "@/lib/quizState"
import { useEffect, useState } from "react"
import { PiArrowLeft, PiArrowRight } from "react-icons/pi"

type Timeout = ReturnType<typeof setInterval>

const Quiz = () => {
    const [isQuizEnable, setIsQuizEnable] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false)
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
            {!isQuizEnable && !isCompleted && (
                <div className="flex flex-col gap-5 w-[600px]">
                    <h1 className="text-3xl font-bold">VOCÊ É UM CONDUTOR EXEMPLAR? TESTE AQUI!</h1>
                    <p>
                        Este quiz serve tanto para condutores experientes quanto para iniciantes, proporcionando uma oportunidade divertida e educativa para todos melhorarem a sua consciência sobre segurança no trânsito. Boa sorte e boa viagem!</p>
                    <button className="btn btn-accent text-white" onClick={() => setIsQuizEnable(true)}>Começar teste</button>
                </div>
            )}
            {isQuizEnable && (
                <div className="flex flex-col gap-5 w-[600px]">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-between items-center w-full">
                            <h1 className="text-3xl font-bold">Question {currentQuestionIndex + 1}</h1>
                            <p>{currentQuestionIndex + 1}/{questions.length}</p>
                        </div>
                        {/* @ts-ignore */}
                        <div className="absolute top-20 right-80 radial-progress text-primary flex items-center justify-center text-center text-sm" style={{ "--value": (timer / (60 * 4)) * 100, "--size": "6rem", "--thickness": "3px" }} role="progressbar">
                            {Math.floor(timer / 60)}min {timer % 60} segundos
                        </div>

                    </div>
                    <h1 className="">{questions[currentQuestionIndex].question}</h1>
                    <div className="flex flex-col gap-3">
                        {questions[currentQuestionIndex].options.map((option, index) => {
                            const isSelected = userAnswers[currentQuestionIndex] === index;
                            return (
                                <button
                                    key={index}
                                    className={`btn  ${isSelected ? "btn-primary text-white" : ""}`}
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
                        <button className="btn btn-ghost text-primary w-fit" onClick={backQuestion} disabled={currentQuestionIndex <= 0 ? true : false}>
                            <PiArrowLeft />
                        </button>
                        <button className="btn btn-ghost text-primary w-fit" onClick={nextQuestion} disabled={currentQuestionIndex >= questions.length - 1 || userAnswers[currentQuestionIndex] === undefined} >
                            <PiArrowRight />
                        </button>
                    </div>

                    <progress className="progress progress-primary w-full" value={(currentQuestionIndex + 1) / questions.length * 100} max="100"></progress>

                    {currentQuestionIndex === questions.length - 1 && <button className="btn btn-accent text-white" onClick={() => {
                        calculateScore()
                        setIsQuizEnable(false)
                        setIsCompleted(true)
                    }} disabled={userAnswers.includes(undefined) || userAnswers.length === 0 || userAnswers.length < 10}>Finish!</button>}
                </div >
            )}

            {isCompleted && <div className="flex flex-col gap-5 justify-center items-center">
                <h1 className="text-5xl font-bold text-accent">Your Score is {score} 🎉</h1>
                <button className="btn btn-neutral" onClick={() => {
                    setIsQuizEnable(true)
                    reset()
                    setTimer(60 * 4)
                    setIsCompleted(false)
                }}>Reset</button>
            </div>}
        </div >
    )
}

export default Quiz