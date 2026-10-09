import { Trash2 } from "lucide-react";

function QuestionForm({

    index,

    question,

    updateQuestion,

    removeQuestion

}) {

    const correctIndex = question.options.findIndex(
        option => option.isCorrect
    );

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-lg">

            <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold text-cyan-400">

                    Question {index + 1}

                </h2>

                <button
                    onClick={() => removeQuestion(index)}
                    className="text-red-400 hover:text-red-300 transition"
                >
                    <Trash2 size={22} />
                </button>

            </div>

            {/* Question */}

            <div>

                <label className="block mb-2 font-semibold">

                    Question

                </label>

                <textarea

                    rows={3}

                    value={question.question}

                    onChange={(e)=>

                        updateQuestion(

                            index,

                            "question",

                            e.target.value

                        )

                    }

                    className="w-full bg-slate-800 rounded-xl p-4"

                    placeholder="Enter Question"

                />

            </div>

            {/* Options */}

            <div className="space-y-4">

                <label className="font-semibold">

                    Options

                </label>

                {

                    question.options.map((option, optionIndex)=>(

                        <div
                            key={optionIndex}
                            className="flex items-center gap-4"
                        >

                            <input

                                type="radio"

                                checked={correctIndex===optionIndex}

                                onChange={()=>

                                    updateQuestion(

                                        index,

                                        "correctAnswer",

                                        optionIndex

                                    )

                                }

                            />

                            <input

                                value={option.text}

                                onChange={(e)=>

                                    updateQuestion(

                                        index,

                                        `option${optionIndex}`,

                                        e.target.value

                                    )

                                }

                                className="flex-1 bg-slate-800 rounded-xl p-3"

                                placeholder={`Option ${optionIndex+1}`}

                            />

                        </div>

                    ))

                }

            </div>

            {/* Marks Difficulty */}

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <label className="block mb-2">

                        Marks

                    </label>

                    <input

                        type="number"

                        value={question.marks}

                        onChange={(e)=>

                            updateQuestion(

                                index,

                                "marks",

                                e.target.value

                            )

                        }

                        className="w-full bg-slate-800 rounded-xl p-3"

                    />

                </div>

                <div>

                    <label className="block mb-2">

                        Difficulty

                    </label>

                    <select

                        value={question.difficulty}

                        onChange={(e)=>

                            updateQuestion(

                                index,

                                "difficulty",

                                e.target.value

                            )

                        }

                        className="w-full bg-slate-800 rounded-xl p-3"

                    >

                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>

                    </select>

                </div>

            </div>

            {/* Topic */}

            <div>

                <label className="block mb-2">

                    Topic

                </label>

                <input

                    value={question.topic}

                    onChange={(e)=>

                        updateQuestion(

                            index,

                            "topic",

                            e.target.value

                        )

                    }

                    className="w-full bg-slate-800 rounded-xl p-3"

                    placeholder="Example: Loops"

                />

            </div>

            {/* Bloom */}

            <div>

                <label className="block mb-2">

                    Bloom's Taxonomy

                </label>

                <select

                    value={question.bloomLevel}

                    onChange={(e)=>

                        updateQuestion(

                            index,

                            "bloomLevel",

                            e.target.value

                        )

                    }

                    className="w-full bg-slate-800 rounded-xl p-3"

                >

                    <option>Remember</option>
                    <option>Understand</option>
                    <option>Apply</option>
                    <option>Analyze</option>
                    <option>Evaluate</option>
                    <option>Create</option>

                </select>

            </div>

            {/* Explanation */}

            <div>

                <label className="block mb-2">

                    Explanation

                </label>

                <textarea

                    rows={3}

                    value={question.explanation}

                    onChange={(e)=>

                        updateQuestion(

                            index,

                            "explanation",

                            e.target.value

                        )

                    }

                    className="w-full bg-slate-800 rounded-xl p-4"

                    placeholder="Explain why this answer is correct..."

                />

            </div>

        </div>

    );

}

export default QuestionForm;