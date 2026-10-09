import { Clock, BookOpen, Brain, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function StudentQuizCard({ quiz }) {

    const navigate = useNavigate();

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 hover:scale-[1.02] transition-all">

            <div className="flex justify-between items-start">

                <div className="space-y-3">

                    <h2 className="text-2xl font-bold">
                        {quiz.title}
                    </h2>

                    <p className="text-slate-400">
                        {quiz.description}
                    </p>

                    <div className="flex flex-wrap gap-5 text-slate-400">

                        <div className="flex items-center gap-2">

                            <Clock size={18} />

                            {quiz.duration} Minutes

                        </div>

                        <div className="flex items-center gap-2">

                            <BookOpen size={18} />

                            {quiz.questions.length} Questions

                        </div>

                        <div className="flex items-center gap-2 text-cyan-400">

                            <Brain size={18} />

                            AI Adaptive

                        </div>

                    </div>

                </div>

                <button

                    onClick={() =>
                        navigate(`/student/quiz/${quiz._id}`)
                    }

                    className="bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl flex items-center gap-2"

                >

                    <PlayCircle size={20} />

                    Start Quiz

                </button>

            </div>

        </div>

    );

}

export default StudentQuizCard;