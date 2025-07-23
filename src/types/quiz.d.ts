interface QuizType {
    quizId: number;
    question: string;
    choices: string[];
    answer: number;
}

interface WeekQuiz {
    week: number;
    quizzes: QuizType[];
}
