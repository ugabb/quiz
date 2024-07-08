'use client';

import FormEnd from "@/app/components/FormEnd";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useQuiz } from "@/lib/quizState";
import { cn } from "@/lib/utils";
import {
    useEffect,
    useState
} from "react";

import toast from "react-hot-toast"
import {
    PiArrowLeft,
    PiArrowRight
} from "react-icons/pi";

type Timeout = ReturnType<typeof setInterval>;

export default function AnswerQuiz() {

    const [timer, setTimer] = useState(60 * 4) // 4 minutos
    const [isQuizEnable, setIsQuizEnable] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const {
        questions,
        currentQuestionIndex,
        setAnswer,
        removeAnswer,
        nextQuestion,
        backQuestion,
        userAnswers,
        calculateScore
    } = useQuiz();

    useEffect(() => {
        let interval: Timeout;
        if (isQuizEnable) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev > 0) return prev - 1;
                    clearInterval(interval);
                    calculateScore();
                    setIsQuizEnable(false);
                    toast.error("Tempo esgotado!");
                    return 0;
                })
            }, 1000)
        }

        return () => clearInterval(interval);
    }, [isQuizEnable]);

    return(
        
        <div className="w-full flex justify-center">

            {!isQuizEnable && !isCompleted && !isAuthorized &&(
                <div className="flex flex-col gap-5 w-[600px] py-20 px-8">
                    <h1 className="text-3xl text-center font-bold">VOCÊ É UM CONDUTOR EXEMPLAR? TESTE AQUI!</h1>
                    <p className="text-zinc-500">
                        Este quiz serve tanto para condutores experientes quanto para iniciantes, proporcionando uma oportunidade divertida e educativa para todos melhorarem a sua consciência sobre segurança no trânsito. Boa sorte e boa viagem!
                    </p>
                    <Button
                        variant={`default`}
                        className="bg-cyan-600 hover:bg-cyan-500 p-6"
                        onClick={() => setIsQuizEnable(true)}
                    >
                        Começar teste
                    </Button>
                </div>
            )}

            {isQuizEnable && !isCompleted && (
                <div className="flex flex-col w-full py-10 max-w-3xl">

                    <div className="w-full h-36 flex justify-end mb-4">

                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            {/* Background circle */}
                            <circle
                                className="text-gray-200 stroke-current"
                                strokeWidth="10"
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                            ></circle>
                            {/* Progress circle */}
                            <circle
                                className="text-violet-700 stroke-current progress-ring__circle"
                                strokeWidth="10"
                                strokeLinecap="round"
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                strokeDashoffset={`calc(400 - (400 * ${((timer - 0) / (240-0)) * 61}) / 100)`}
                            ></circle>

                            {/* Center text */}
                            <text x="50" y="50" fontFamily="Verdana" fontSize="8" textAnchor="middle" alignmentBaseline="middle">
                                <tspan x="50" y="43" alignmentBaseline="middle">{Math.floor(timer / 60)}min</tspan>
                                <tspan x="50" y="58" textAnchor="middle">{timer % 60} segundos</tspan>
                            </text>
                        </svg>
                    </div>

                    <div className="flex justify-between items-center">

                        <div className="flex justify-between items-center w-full">

                            <h1 className="text-3xl font-bold">Questão {currentQuestionIndex + 1}</h1>
                            <p>{currentQuestionIndex + 1}/{questions.length}</p>
                        </div>

                    </div>
                    <h1 className="p-2">
                        {questions[currentQuestionIndex].question}
                    </h1>
                    <div className="flex flex-col space-y-3">
                        {questions[currentQuestionIndex].options.map((option, index) => {
                            const isSelected = userAnswers[currentQuestionIndex] === index;

                            return (
                                <Button
                                    key={index}
                                    //variant={isSelected ? `default` : `secondary`}
                                    className={cn(
                                        isSelected
                                            ? `bg-violet-700 hover:bg-violet-600`
                                            : `bg-zinc-200 text-zinc-800 hover:bg-zinc-100`
                                        , `p-6`
                                        , `text-wrap`
                                    )}
                                    onClick={() => {
                                        if (isSelected) {
                                            removeAnswer(currentQuestionIndex)
                                        } else {
                                            setAnswer(currentQuestionIndex, index)
                                        }
                                    }}
                                >
                                    {option}
                                </Button>
                            )
                        })}
                    </div>
                    <div className="flex justify-between p-2">
                        <Button
                        variant={`ghost`}
                            className="text-primary w-fit"
                            onClick={backQuestion}
                            disabled={currentQuestionIndex <= 0 ? true : false}
                        >
                            <PiArrowLeft size={24} color="darkViolet" />
                        </Button>
                        <Button
                            variant={`ghost`}
                            className="text-primary w-fit"
                            onClick={nextQuestion}
                            disabled={
                                currentQuestionIndex >= questions.length - 1 || userAnswers[currentQuestionIndex] === undefined
                            }
                        >
                            <PiArrowRight size={24} color="darkViolet" />
                        </Button>
                    </div>

                    <Progress
                        indicatorClassName={`bg-violet-700`}
                        value={
                            (currentQuestionIndex + 1) / questions.length * 100
                        }
                        max={100}
                        className="mb-4"
                    />

                    {currentQuestionIndex === questions.length - 1 &&
                        <Button
                            onClick={() => {
                                calculateScore()
                                setIsQuizEnable(false)
                                setIsCompleted(true)
                            }}
                            disabled={
                                userAnswers.includes(undefined) || userAnswers.length === 0 || userAnswers.length < questions.length
                            }
                            className="p-6 bg-violet-700 hover:bg-violet-600"
                        >
                            Terminar!
                        </Button>}
                </div>
            )}

            {isAuthorized && !isQuizEnable && (
                <div className="py-10">
                    <FormEnd />
                </div>
            )}

            <AlertDialog
                open={isCompleted}
                onOpenChange={setIsCompleted}
                defaultOpen={true}
            >
                <AlertDialogContent className="">

                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-extrabold">
                            ACORDO DE POLÍTICA DE PRIVACIDADE
                        </AlertDialogTitle>
                        {/* <AlertDialogDescription className="text-xs">
                            desc
                        </AlertDialogDescription> */}
                    </AlertDialogHeader>

                        <div className="w-full space-y-2 text-sm text-justify">
                            <p className="">
                                Para receber o resultado do seu quiz, solicitamos seu consentimento em relação à coleta, armazenamento e tratamento dos seus dados pessoais pela nossa plataforma, em conformidade com a Lei Geral de Proteção de Dados.
                            </p>
                            <h3 className="font-semibold text-lg">1. Dados Pessoais</h3>
                            <p className="">
                                Considera-se dado pessoal toda informação relacionada à pessoa natural identificada ou identificável, isto é, qualquer informação que possa identificar o seu titular, como, por exemplo, nomes, números, códigos de identificação, endereços, característica, dentre outras. O CNVV realiza o tratamento de dados pessoais nos moldes previstos nos artigos 6º e 7º da Lei nº 13.709/2018, observando a boa-fé e todos os seus princípios, especialmente dentro da sua finalidade do tratamento para propósitos legítimos, específicos, explícitos e informados antecipadamente ao seu titular, com exatidão, clareza, relevância e atualização dos dados, de acordo com a necessidade para o cumprimento da finalidade de seu tratamento.
                            </p>
                            <h3 className="font-semibold text-lg">2. Consentimento:</h3>
                            <p className="">
                                Ao utilizar nossos serviços, você concorda expressamente com a coleta, armazenamento e tratamento dos seus dados pessoais, conforme descrito neste documento.
                            </p>
                        </div>
                        <div className="flex items-center space-x-1 gap-2">
                            <Switch
                                id="authorization"
                                onClick={() => setIsAuthorized(prev => !prev)}
                                // color="#1506e4"
                                className={`to-violet-600 bg-gradient-to-r from-violet-500`}
                            />
                            <Label
                                htmlFor="authorization"
                                className="text-zinc-500 hover:cursor-pointer"
                            >
                                Concordo com a coleta e processamento de meus dados pessoais do quiz cnvv, de acordo com a Política de Privacidade
                            </Label>
                        </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsQuizEnable(true)}>Fechar</AlertDialogCancel>
                        <AlertDialogAction className={`bg-violet-600 hover:bg-violet-500`} disabled={!isAuthorized}>Aceitar</AlertDialogAction>
                    </AlertDialogFooter>

                </AlertDialogContent>
            </AlertDialog>

        </div>
    );

};
