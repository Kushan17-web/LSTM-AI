import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import QuizCard from "../../components/QuizCard";

import {
    getQuizzes,
    deleteQuiz
} from "../../services/quizService";

function QuizList() {

    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {

        loadQuizzes();

    }, []);

    const loadQuizzes = async () => {

        const data = await getQuizzes();

        setQuizzes(data.quizzes);

    };

    const handleDelete = async (quiz) => {

        if (!window.confirm("Delete quiz?"))
            return;

        await deleteQuiz(quiz._id);

        loadQuizzes();

    };

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <div className="flex justify-between">

                    <div>

                        <h1 className="text-4xl font-bold">

                            Quizzes

                        </h1>

                        <p className="text-gray-400 mt-2">

                            Manage quizzes.

                        </p>

                    </div>

                    <button

                        onClick={() =>
                            navigate("/teacher/quizzes/add")
                        }

                        className="bg-cyan-500 px-6 py-3 rounded-xl"

                    >

                        + Create Quiz

                    </button>

                </div>

                <div className="space-y-5">

                    {

                        quizzes.map((quiz) => (

                            <QuizCard

                                key={quiz._id}

                                quiz={quiz}

                                onDelete={handleDelete}

                                onEdit={(quiz) =>
                                    navigate(`/teacher/quizzes/edit/${quiz._id}`)
                                }

                            />

                        ))

                    }

                </div>

            </div>

        </DashboardLayout>

    );

}

export default QuizList;