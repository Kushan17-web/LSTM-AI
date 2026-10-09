import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import QuestionForm from "../../components/QuestionForm";

import { createQuiz } from "../../services/studentquizService";
import { getCourses } from "../../services/courseService";

function CreateQuiz(){

    const navigate = useNavigate();

    const createEmptyQuestion = () => ({

        question: "",

        options: [

            { text: "", isCorrect: false },

            { text: "", isCorrect: false },

            { text: "", isCorrect: false },

            { text: "", isCorrect: false }

        ],

        explanation: "",

        marks: 1,

        difficulty: "Easy",

        topic: "",

        bloomLevel: "Understand"

    });

    const [courses, setCourses] = useState([]);

    const [quiz, setQuiz] = useState({

        title: "",

        description: "",

        course: "",

        duration: 30,

        passingMarks: 40,

        questions: [

            createEmptyQuestion()

        ]

    });

    useEffect(() => {

        loadCourses();

    }, []);

    const loadCourses = async () => {

        try {

            const data = await getCourses();

console.log("Courses Response:", data);

if (Array.isArray(data)) {

    setCourses(data);

}

else if (Array.isArray(data.courses)) {

    setCourses(data.courses);

}

else {

    setCourses([]);

}

        }

        catch (err) {

            console.error(err);

        }

    };

    const updateQuestion = (index, field, value) => {

        const updatedQuestions = [...quiz.questions];

        if (field.startsWith("option")) {

            const optionIndex = Number(

                field.replace("option", "")

            );

            updatedQuestions[index]

                .options[optionIndex]

                .text = value;

        }

        else if (field === "correctAnswer") {

            updatedQuestions[index]

                .options

                .forEach((option, i) => {

                    option.isCorrect =

                        i === Number(value);

                });

        }

        else {

            updatedQuestions[index][field] = value;

        }

        setQuiz({

            ...quiz,

            questions: updatedQuestions

        });

    };

    const addQuestion = () => {

        const last = quiz.questions[quiz.questions.length - 1];

        if (

            last.question.trim() === "" ||

            last.options.some(

                option => option.text.trim() === ""

            )

        ) {

            alert(

                "Please complete the current question first."

            );

            return;

        }

        setQuiz({

            ...quiz,

            questions: [

                ...quiz.questions,

                createEmptyQuestion()

            ]

        });

    };

    const removeQuestion = (index) => {

        if (quiz.questions.length === 1) {

            alert(

                "Quiz must contain at least one question."

            );

            return;

        }

        setQuiz({

            ...quiz,

            questions: quiz.questions.filter(

                (_, i) => i !== index

            )

        });

    };

    const submitQuiz = async () => {

        try {

            if (!quiz.title.trim()) {

                alert("Quiz title is required.");

                return;

            }

            if (!quiz.course) {

                alert("Please select a course.");

                return;

            }

            const validQuestions =

                quiz.questions.filter(question =>

                    question.question.trim() !== "" &&

                    question.options.every(

                        option =>

                            option.text.trim() !== ""

                    )

                );

            if (validQuestions.length === 0) {

                alert(

                    "Please add at least one complete question."

                );

                return;

            }

            const totalMarks =

                validQuestions.reduce(

                    (sum, question) =>

                        sum +

                        Number(question.marks),

                    0

                );

            const payload = {

                ...quiz,

                questions: validQuestions,

                totalMarks

            };

            console.log(payload);

            await createQuiz(payload);

            alert("Quiz Created Successfully!");

            navigate("/teacher/quizzes");

        }

        catch (err) {

            console.error(err);

            alert(

                err.response?.data?.message ||

                "Unable to create quiz."

            );

        }

    };
        return (

        <DashboardLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        Create Quiz

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Build a professional assessment.

                    </p>

                </div>

                {/* Quiz Details */}

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">

                    <div>

                        <label className="block mb-2 font-semibold">

                            Quiz Title

                        </label>

                        <input

                            value={quiz.title}

                            onChange={(e) =>

                                setQuiz({

                                    ...quiz,

                                    title: e.target.value

                                })

                            }

                            placeholder="Python Basics Quiz"

                            className="w-full bg-slate-800 rounded-xl p-4"

                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Description

                        </label>

                        <textarea

                            rows={4}

                            value={quiz.description}

                            onChange={(e) =>

                                setQuiz({

                                    ...quiz,

                                    description: e.target.value

                                })

                            }

                            placeholder="Quiz description..."

                            className="w-full bg-slate-800 rounded-xl p-4"

                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Course

                        </label>

                        <select

                            value={quiz.course}

                            onChange={(e) =>

                                setQuiz({

                                    ...quiz,

                                    course: e.target.value

                                })

                            }

                            className="w-full bg-slate-800 rounded-xl p-4"

                        >

                            <option value="">

                                Select Course

                            </option>

                            {

                                courses.map(course => (

                                    <option

                                        key={course._id}

                                        value={course._id}

                                    >

                                        {course.title}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="grid grid-cols-2 gap-6">

                        <div>

                            <label className="block mb-2 font-semibold">

                                Duration (Minutes)

                            </label>

                            <input

                                type="number"

                                value={quiz.duration}

                                onChange={(e) =>

                                    setQuiz({

                                        ...quiz,

                                        duration: Number(e.target.value)

                                    })

                                }

                                className="w-full bg-slate-800 rounded-xl p-4"

                            />

                        </div>

                        <div>

                            <label className="block mb-2 font-semibold">

                                Passing Marks (%)

                            </label>

                            <input

                                type="number"

                                value={quiz.passingMarks}

                                onChange={(e) =>

                                    setQuiz({

                                        ...quiz,

                                        passingMarks: Number(e.target.value)

                                    })

                                }

                                className="w-full bg-slate-800 rounded-xl p-4"

                            />

                        </div>

                    </div>

                </div>

                {/* Questions */}

                {

                    quiz.questions.map(

                        (question, index) => (

                            <QuestionForm

                                key={index}

                                index={index}

                                question={question}

                                updateQuestion={updateQuestion}

                                removeQuestion={removeQuestion}

                            />

                        )

                    )

                }

                {/* Buttons */}

                <div className="flex gap-5">

                    <button

                        onClick={addQuestion}

                        className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-xl font-semibold"

                    >

                        + Add Question

                    </button>

                    <button

                        onClick={submitQuiz}

                        className="bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-xl font-semibold"

                    >

                        Save Quiz

                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default CreateQuiz;