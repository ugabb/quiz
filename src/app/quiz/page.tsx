"use client"
import { useQuiz } from "@/lib/quizState"
import { useEffect, useState } from "react"
import { PiArrowLeft, PiArrowRight } from "react-icons/pi"
import FormEnd from "../components/FormEnd"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

type Timeout = ReturnType<typeof setInterval>

const Quiz = () => {
    const [isQuizEnable, setIsQuizEnable] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false)
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [timer, setTimer] = useState(60 * 4) // 4 minutos
    const { questions, currentQuestionIndex, setAnswer, removeAnswer, nextQuestion, backQuestion, userAnswers, calculateScore } = useQuiz()

    const router = useRouter()

    useEffect(() => {
        let interval: Timeout;
        if (isQuizEnable) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev > 0) return prev - 1
                    clearInterval(interval)
                    calculateScore()
                    setIsQuizEnable(false)
                    toast.error("Tempo esgotado!")
                    return 0
                })
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [isQuizEnable])

    return (
        <div className="min-h-screen flex justify-center items-center p-10">
            {!isQuizEnable && !isCompleted && (
                <div className="flex flex-col gap-5 w-[600px]">
                    <h1 className="text-3xl text-center font-bold">VOCÊ É UM CONDUTOR EXEMPLAR? TESTE AQUI!</h1>
                    <p className="text-zinc-500">
                        Este quiz serve tanto para condutores experientes quanto para iniciantes, proporcionando uma oportunidade divertida e educativa para todos melhorarem a sua consciência sobre segurança no trânsito. Boa sorte e boa viagem!</p>
                    <button className="btn btn-accent text-white" onClick={() => setIsQuizEnable(true)}>Começar teste</button>
                </div>
            )}
            {isQuizEnable && (
                <div className="flex flex-col gap-5 w-[600px]">
                    {/* @ts-ignore */}
                    <div className="mx-auto md:absolute md:top-24 md:right-20 lg:right-56 radial-progress text-primary flex items-center justify-center text-center text-sm" style={{ "--value": (timer / (60 * 4)) * 100, "--size": "6rem", "--thickness": "3px" }} role="progressbar">
                        {Math.floor(timer / 60)}min {timer % 60} segundos
                    </div>
                    <div className="flex justify-between items-center">

                        <div className="flex justify-between items-center w-full">

                            <h1 className="text-3xl font-bold">Questão {currentQuestionIndex + 1}</h1>
                            <p>{currentQuestionIndex + 1}/{questions.length}</p>
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
                    }} disabled={userAnswers.includes(undefined) || userAnswers.length === 0 || userAnswers.length < questions.length}>Terminar!</button>}
                </div >
            )}

            {isCompleted && <div className="flex flex-col gap-5 justify-center items-center">
                <FormEnd />

                <dialog open={isCompleted} id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">ACORDO DE POLÍTICA DE PRIVACIDADE</h3>
                        <p className="py-4">exemplo, nomes, números, códigos de identificação, endereços, característica, dentre outras. O CNVV realiza o tratamento de dados pessoais nos moldes previstos nos artigos 6º e 7º da Lei nº 13.709/2018, observando a boa-fé e todos os seus princípios, especialmente dentro da sua finalidade do tratamento para propósitos legítimos, específicos, explícitos e informados antecipadamente ao seu titular, com exatidão, clareza, relevância e atualização dos dados, de acordo com a necessidade para o cumprimento da finalidade de seu tratamento.
                            2. Consentimento:
                            Ao utilizar nossos serviços, você concorda expressamente com a coleta, armazenamento e tratamento dos seus dados pessoais, conforme descrito neste documento.</p>
                        <div className="modal-action">
                            <form method="dialog" className="flex flex-col gap-3 mx-auto">
                                <label className="label justify-start gap-3">
                                    <input type="checkbox" onChange={() => setIsAuthorized(prev => !prev)} className="checkbox checkbox-primary" />
                                    <span className="label-text">Confirmo que as informações acima estão corretas</span>
                                </label>
                                <div className="flex gap-3 items-center justify-center">
                                    <button className="btn btn-primary" disabled={!isAuthorized} >Aceitar</button>
                                    <button className="btn" onClick={() => router.push("/")}>Recusar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>}
        </div >
    )
}

export default Quiz