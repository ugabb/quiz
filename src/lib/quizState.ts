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
    question:
      "Qual é o tipo de dado retornado por `typeof null` em JavaScript?",
    options: ["undefined", "object", "null", "boolean", "number"],
    correctAnswer: 1,
  },
  {
    question: "Qual é o resultado de `2 + '2'` em JavaScript?",
    options: ["4", "22", "NaN", "undefined", "TypeError"],
    correctAnswer: 1,
  },
  {
    question:
      "Qual das seguintes palavras-chave é usada para definir uma variável em JavaScript?",
    options: [
      "var",
      "let",
      "const",
      "Todas as anteriores",
      "Nenhuma das anteriores",
    ],
    correctAnswer: 3,
  },
  {
    question: "Qual método converte uma string em um inteiro em JavaScript?",
    options: [
      "parseInt()",
      "parseFloat()",
      "Number()",
      "Integer()",
      "convertInt()",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "Qual das seguintes opções NÃO é uma estrutura de dados primitiva em JavaScript?",
    options: ["String", "Number", "Boolean", "Object", "Undefined"],
    correctAnswer: 3,
  },
  {
    question: "Como você escreve um comentário em JavaScript?",
    options: [
      "// Isto é um comentário",
      "/* Isto é um comentário */",
      "<!-- Isto é um comentário -->",
      "Ambos // e /* */",
      "Apenas //",
    ],
    correctAnswer: 3,
  },
  {
    question: "Qual operador é usado para atribuição em JavaScript?",
    options: ["==", "===", "=", "<=", "=>"],
    correctAnswer: 2,
  },
  {
    question:
      "Qual método é usado para adicionar elementos ao final de um array em JavaScript?",
    options: ["push()", "pop()", "shift()", "unshift()", "concat()"],
    correctAnswer: 0,
  },
  {
    question:
      "Qual é o escopo de uma variável definida com a palavra-chave `let`?",
    options: ["Global", "Função", "Bloco", "Objeto", "Script"],
    correctAnswer: 2,
  },
  {
    question: "O que `NaN` significa em JavaScript?",
    options: [
      "Null as Number",
      "Not a Number",
      "Negative Number",
      "Number as Null",
      "None",
    ],
    correctAnswer: 1,
  },
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
