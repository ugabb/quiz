import { create } from "zustand";

type Quiz = {
  score: number;
  calculateScore: () => void;
  inc: () => void;
  dec: () => void;
  currentQuestionIndex: number;
  nextQuestion: () => void;
  backQuestion: () => void;
  setAnswer: (questionIndex: number, answerIndex: number) => void;
  removeAnswer: (questionIndex: number) => void;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  userAnswers: (number | undefined)[];
  reset: () => void;
};

const quizData = [
  {
    question: "📵 Qual é a regra geral sobre o uso do celular enquanto dirige?",
    options: [
      "É seguro, desde que você esteja usando um aplicativo de GPS.",
      "É permitido, desde que você esteja no modo viva-voz.",
      "É ilegal e perigoso.",
      "É permitido com o uso de fones de ouvido.",
    ],
    correctAnswer: 2,
  },
  {
    question: "O que fazer ao testemunhar um acidente de trânsito com vítimas?",
    options: [
      "Parar e bloquear a via para proteger os envolvidos.",
      "Ligar para os serviços de emergência e prestar os primeiros socorros, se possível.",
      "Ligar para os serviços de emergência, e sinalizar a batida.",
      "Continuar o trajeto e não se envolver.",
    ],
    correctAnswer: 2,
  },
  // {
  //   question: "O uso de equipamento de retenção adequado (bebê conforto, cadeirinha ou assento de elevação) é obrigatório em crianças de:",
  //   options: [
  //     "Até 5 anos ou com até 1,15 m de altura.",
  //     "Até 6 anos e meio ou com até 1,25 m de altura.",
  //     "Até 10 anos ou com até 1,45 m de altura.",
  //     "Até 8 anos ou com até 1,35 m de altura.",
  //   ],
  //   correctAnswer: 2,
  // },
  // {
  //   question: "Em um cruzamento sem sinalização ou placas, quem tem a preferência?",
  //   options: [
  //     "O veículo maior.",
  //     "O veículo mais veloz.",
  //     "O veículo que chegou primeiro ao cruzamento.",
  //     "O veículo que estiver à direita do condutor.",
  //   ],
  //   correctAnswer: 3,
  // },
  // {
  //   question: "🛑 Qual é a velocidade máxima permitida em uma via urbana não sinalizada?",
  //   options: [
  //     "40 km/h.",
  //     "70 km/h.",
  //     "60 km/h.",
  //     "80 km/h.",
  //   ],
  //   correctAnswer: 2,
  // },
  // {
  //   question: "🚗 Em que situações o uso de farol baixo é obrigatório para veículos durante o dia?",
  //   options: [
  //     "Em rodovias de pista simples situadas fora dos perímetros urbanos.",
  //     "Em qualquer condição de chuva, granizo, neblina ou cerração.",
  //     "Em túneis com iluminação pública.",
  //     "Todas as opções acima.",
  //   ],
  //   correctAnswer: 3,
  // },
  // {
  //   question: "🛣 Quando a rodovia possui três ou mais faixas de trânsito no mesmo sentido, quais são destinadas aos veículos que desenvolvem velocidade maior?",
  //   options: [
  //     "Faixas da direita.",
  //     "Faixa central.",
  //     "Faixas da esquerda.",
  //     "Todas as opções acima.",
  //   ],
  //   correctAnswer: 2,
  // },
];

export const useQuiz = create<Quiz>()((set, get) => ({
  score: 0,
  calculateScore: () => {
    const { userAnswers, questions } = get();
    const score = questions.reduce((acc, question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        return acc + 1;
      }

      return acc;
    }, 0);
    set({ score });
  },
  inc: () => set((state) => ({ score: state.score + 1 })),
  dec: () => set((state) => ({ score: state.score - 1 })),
  currentQuestionIndex: 0,
  nextQuestion: () =>
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
  backQuestion: () =>
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex - 1 })),
  setAnswer: (questionIndex, answerIndex) =>
    set((state) => {
      const userAnswers = [...state.userAnswers]; // copia array
      userAnswers[questionIndex] = answerIndex; // atualiza resposta
      console.log(userAnswers);
      return { userAnswers }; // retorna novo estado
    }),
  removeAnswer: (questionIndex) =>
    set((state) => {
      const userAnswers = [...state.userAnswers];
      userAnswers[questionIndex] = undefined;
      return { userAnswers };
    }),
  questions: quizData,
  userAnswers: [],
  reset: () => set({ score: 0, currentQuestionIndex: 0, userAnswers: [] }),
}));
