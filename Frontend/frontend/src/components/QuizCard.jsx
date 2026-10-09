import { Pencil, Trash2, Clock, BookOpen } from "lucide-react";

function QuizCard({

    quiz,

    onEdit,

    onDelete

}) {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition">

            <div className="flex justify-between">

                <div>

                    <h2 className="text-2xl font-semibold">

                        {quiz.title}

                    </h2>

                    <p className="text-gray-400 mt-2">

                        {quiz.description}

                    </p>

                    <div className="flex gap-6 mt-5 text-gray-400">

                        <div className="flex items-center gap-2">

                            <Clock size={16} />

                            {quiz.duration} min

                        </div>

                        <div className="flex items-center gap-2">

                            <BookOpen size={16} />

                            {quiz.questions.length} Questions

                        </div>

                    </div>

                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() => onEdit(quiz)}
                        className="bg-slate-800 p-3 rounded-xl hover:bg-cyan-500 transition"
                    >
                        <Pencil size={18} />
                    </button>

                    <button
                        onClick={() => onDelete(quiz)}
                        className="bg-slate-800 p-3 rounded-xl hover:bg-red-500 transition"
                    >
                        <Trash2 size={18} />
                    </button>

                </div>

            </div>

        </div>

    );

}

export default QuizCard;