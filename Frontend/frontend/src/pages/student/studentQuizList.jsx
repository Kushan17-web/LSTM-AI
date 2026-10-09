import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getQuizzes } from "../../services/studentQuizService";

function studentQuizList() {

    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadQuizzes();

    }, []);

    const loadQuizzes = async () => {

        try {

            const data = await getQuizzes();

            if (Array.isArray(data)) {

                setQuizzes(data);

            }

            else {

                setQuizzes(data.quizzes || []);

            }

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        Available Quizzes

                    </h1>

                    <p className="text-gray-400">

                        Attempt quizzes assigned to you.

                    </p>

                </div>

                {

                    loading ?

                    (

                        <div className="text-center py-20">

                            Loading...

                        </div>

                    )

                    :

                    (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                            {

                                quizzes.map((quiz) => (

                                    <div

                                        key={quiz._id}

                                        className="bg-slate-900 rounded-2xl border border-slate-800 p-6"

                                    >

                                        <h2 className="text-2xl font-bold">

                                            {quiz.title}

                                        </h2>

                                        <p className="text-gray-400 mt-2">

                                            {quiz.description}

                                        </p>

                                        <div className="space-y-2 mt-6">

                                            <p>

                                                📚 {quiz.course?.title || "No Course"}

                                            </p>

                                            <p>

                                                📝 {quiz.questions.length} Questions

                                            </p>

                                            <p>

                                                ⏱ {quiz.duration} Minutes

                                            </p>

                                            <p>

                                                🏆 {quiz.totalMarks} Marks

                                            </p>

                                        </div>

                                        <button

                                            onClick={() =>

                                                navigate(

                                                    `/student/quiz/${quiz._id}`

                                                )

                                            }

                                            className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 rounded-xl py-3 font-semibold"

                                        >

                                            Start Quiz

                                        </button>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </DashboardLayout>

    );

}

export default studentQuizList;