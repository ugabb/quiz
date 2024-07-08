import AnswerQuiz from "./answer-quiz";

export default async function Page({
    params
}: {
    params: { uid: string };
}) {

    return(
        <AnswerQuiz />
    );

};
