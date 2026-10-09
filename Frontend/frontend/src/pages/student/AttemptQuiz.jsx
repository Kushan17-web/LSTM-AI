import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getQuiz } from "../../services/studentQuizService";
import { submitQuiz } from "../../services/attemptService";

function AttemptQuiz() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);

    const [loading, setLoading] = useState(true);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState([]);

    const [markedForReview, setMarkedForReview] = useState([]);

    const [progress, setProgress] = useState(0);

    const [timeLeft, setTimeLeft] = useState(0);

    const [submitting, setSubmitting] = useState(false);

    const [startTime] = useState(Date.now());

    // ==========================
    // Load Quiz
    // ==========================

    useEffect(() => {

        loadQuiz();

    }, []);

    const loadQuiz = async () => {

        try {

            const data = await getQuiz(id);

            const loadedQuiz = data.quiz || data;

            setQuiz(loadedQuiz);

            setTimeLeft(

                loadedQuiz.duration * 60

            );

            const savedAnswers = localStorage.getItem(

                `quiz-${loadedQuiz._id}`

            );

            if (savedAnswers) {

                setAnswers(

                    JSON.parse(savedAnswers)

                );

            }

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // Prevent Refresh
    // ==========================

    useEffect(() => {

        const handler = (e) => {

            e.preventDefault();

            e.returnValue = "";

        };

        window.addEventListener(

            "beforeunload",

            handler

        );

        return () =>

            window.removeEventListener(

                "beforeunload",

                handler

            );

    }, []);

    // ==========================
    // Timer
    // ==========================

    useEffect(() => {

        if (!quiz) return;

        if (timeLeft <= 0) {

            submit();

            return;

        }

        if (timeLeft === 600)

            alert("⚠️ 10 Minutes Remaining");

        if (timeLeft === 300)

            alert("⚠️ 5 Minutes Remaining");

        if (timeLeft === 60)

            alert("🚨 Last Minute");

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft, quiz]);

    // ==========================
    // Progress
    // ==========================

    useEffect(() => {

        if (!quiz) return;

        const answered = answers.length;

        const total = quiz.questions.length;

        setProgress(

            Math.round(

                (answered / total) * 100

            )

        );

        localStorage.setItem(

            `quiz-${quiz._id}`,

            JSON.stringify(answers)

        );

    }, [answers, quiz]);

    // ==========================
    // Select Answer
    // ==========================

    const selectAnswer = (

        questionIndex,

        optionIndex

    ) => {

        const questionId =

            quiz.questions[questionIndex]._id;

        const updated = answers.filter(

            (a) =>

                a.questionId !== questionId

        );

        updated.push({

            questionId,

            selectedOption: optionIndex,

        });

        setAnswers(updated);

    };

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-96">

                    <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-cyan-500"></div>

                </div>

            </DashboardLayout>

        );

    }

    const question =

        quiz.questions[currentQuestion];

    const minutes = Math.floor(

        timeLeft / 60

    );

    const seconds = timeLeft % 60;

    const formattedTime = `${minutes}:${seconds

        .toString()

        .padStart(2, "0")}`;
            // ==========================
    // Submit Quiz
    // ==========================

    const submit = async () => {

        try {

            setSubmitting(true);

            localStorage.removeItem(

                `quiz-${quiz._id}`

            );

            const completedIn = Math.floor(

                (Date.now() - startTime) / 1000

            );

            const result = await submitQuiz(

                quiz._id,

                answers,

                completedIn

            );

            navigate(

                "/student/result",

                {

                    state: result,

                }

            );

        }

        catch (err) {

            console.log(err);

            alert(

                err.response?.data?.message ||

                "Submission Failed"

            );

        }

        finally {

            setSubmitting(false);

        }

    };

    return (

        <DashboardLayout>

            <div className="max-w-7xl mx-auto p-6 space-y-8">

                {/* Header */}

                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <h1 className="text-3xl font-bold">

                                {quiz.title}

                            </h1>

                            <p className="text-gray-400 mt-2">

                                {quiz.description}

                            </p>

                        </div>

                        <div

                            className={`px-6 py-4 rounded-xl text-2xl font-bold text-white ${
                                timeLeft <= 60
                                    ? "bg-red-700 animate-pulse"
                                    : timeLeft <= 300
                                    ? "bg-orange-600"
                                    : "bg-green-600"
                            }`}

                        >

                            ⏱ {formattedTime}

                        </div>

                    </div>

                    {/* Progress */}

                    <div className="mt-6">

                        <div className="flex justify-between mb-2">

                            <span>

                                Quiz Progress

                            </span>

                            <span>

                                {progress}%

                            </span>

                        </div>

                        <div className="w-full bg-slate-700 rounded-full h-3">

                            <div

                                className="bg-cyan-500 h-3 rounded-full transition-all duration-500"

                                style={{

                                    width: `${progress}%`

                                }}

                            />

                        </div>

                    </div>

                </div>

                {/* Question Palette */}

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                    <h3 className="text-xl font-bold mb-4">

                        Question Palette

                    </h3>

                    <div className="flex flex-wrap gap-3">

                        {

                            quiz.questions.map(

                                (q, index) => {

                                    const answered =

                                        answers.find(

                                            a =>

                                                a.questionId === q._id

                                        );

                                    const review =

                                        markedForReview.includes(index);

                                    return (

                                        <button

                                            key={q._id}

                                            onClick={() =>

                                                setCurrentQuestion(index)

                                            }

                                            className={`w-11 h-11 rounded-full font-bold transition

                                            ${
                                                currentQuestion === index

                                                    ? "bg-cyan-500"

                                                    : answered

                                                    ? "bg-green-600"

                                                    : review

                                                    ? "bg-yellow-500"

                                                    : "bg-slate-700"
                                            }`}

                                        >

                                            {index + 1}

                                        </button>

                                    );

                                }

                            )

                        }

                    </div>

                </div>
                                {/* Question */}

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-2xl font-semibold">

                            Question {currentQuestion + 1} / {quiz.questions.length}

                        </h2>

                        {

                            markedForReview.includes(currentQuestion) && (

                                <span className="bg-yellow-500 px-4 py-2 rounded-xl">

                                    🚩 Marked for Review

                                </span>

                            )

                        }

                    </div>

                    <h3 className="text-xl mb-8">

                        {question.question}

                    </h3>

                    <div className="space-y-4">

                        {

                            question.options.map((option, index) => (

                                <label

                                    key={index}

                                    className={`flex items-center gap-4 rounded-xl p-5 cursor-pointer transition border

                                    ${
                                        answers.find(

                                            answer =>

                                                answer.questionId === question._id

                                        )?.selectedOption === index

                                            ? "bg-cyan-600 border-cyan-400"

                                            : "bg-slate-800 border-slate-700 hover:border-cyan-500"
                                    }`}

                                >

                                    <input

                                        type="radio"

                                        checked={

                                            answers.find(

                                                answer =>

                                                    answer.questionId === question._id

                                            )?.selectedOption === index

                                        }

                                        onChange={() =>

                                            selectAnswer(

                                                currentQuestion,

                                                index

                                            )

                                        }

                                    />

                                    {option.text}

                                </label>

                            ))

                        }

                    </div>

                </div>

                {/* Navigation */}

                <div className="flex flex-wrap justify-between gap-4">

                    <button

                        onClick={() => {

                            if (

                                markedForReview.includes(currentQuestion)

                            ) {

                                setMarkedForReview(

                                    markedForReview.filter(

                                        q => q !== currentQuestion

                                    )

                                );

                            }

                            else {

                                setMarkedForReview([

                                    ...markedForReview,

                                    currentQuestion,

                                ]);

                            }

                        }}

                        className="bg-yellow-500 hover:bg-yellow-600 transition px-6 py-3 rounded-xl"

                    >

                        🚩 Mark for Review

                    </button>

                    <button

                        onClick={() =>

                            setCurrentQuestion(

                                Math.max(

                                    currentQuestion - 1,

                                    0

                                )

                            )

                        }

                        disabled={currentQuestion === 0}

                        className="bg-slate-700 hover:bg-slate-600 transition px-6 py-3 rounded-xl disabled:opacity-40"

                    >

                        ← Previous

                    </button>

                    <button

                        onClick={() =>

                            setCurrentQuestion(

                                Math.min(

                                    currentQuestion + 1,

                                    quiz.questions.length - 1

                                )

                            )

                        }

                        disabled={

                            currentQuestion ===

                            quiz.questions.length - 1

                        }

                        className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-xl disabled:opacity-40"

                    >

                        Skip →

                    </button>
                                        {

                        currentQuestion === quiz.questions.length - 1 ?

                        (

                            <button

                                onClick={() => {

                                    const answered = answers.length;

                                    const review = markedForReview.length;

                                    const skipped =

                                        quiz.questions.length -

                                        answered;

                                    if (

                                        window.confirm(

`Quiz Summary

Answered : ${answered}

Skipped : ${skipped}

Marked For Review : ${review}

Do you want to submit?`

                                        )

                                    ) {

                                        submit();

                                    }

                                }}

                                disabled={submitting}

                                className="bg-green-600 hover:bg-green-700 transition px-8 py-3 rounded-xl"

                            >

                                {

                                    submitting ?

                                    "Submitting..."

                                    :

                                    "✅ Submit Quiz"

                                }

                            </button>

                        )

                        :

                        (

                            <button

                                disabled={

                                    !answers.find(

                                        answer =>

                                            answer.questionId ===

                                            question._id

                                    )

                                }

                                onClick={() =>

                                    setCurrentQuestion(

                                        currentQuestion + 1

                                    )

                                }

                                className="bg-cyan-500 hover:bg-cyan-600 transition disabled:bg-slate-700 disabled:cursor-not-allowed px-8 py-3 rounded-xl"

                            >

                                Next →

                            </button>

                        )

                    }

                </div>

                {/* Legend */}

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                    <h4 className="mb-4 font-bold">

                        Question Status

                    </h4>

                    <div className="flex flex-wrap gap-5">

                        <div className="flex items-center gap-2">

                            <div className="w-5 h-5 rounded-full bg-green-600"></div>

                            <span>Answered</span>

                        </div>

                        <div className="flex items-center gap-2">

                            <div className="w-5 h-5 rounded-full bg-yellow-500"></div>

                            <span>Marked for Review</span>

                        </div>

                        <div className="flex items-center gap-2">

                            <div className="w-5 h-5 rounded-full bg-slate-700"></div>

                            <span>Not Answered</span>

                        </div>

                        <div className="flex items-center gap-2">

                            <div className="w-5 h-5 rounded-full bg-cyan-500"></div>

                            <span>Current Question</span>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default AttemptQuiz;
