import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
    Trophy,
    Brain,
    Target,
    ArrowLeft,
    Star,
    Award,
    TrendingUp,
    RotateCcw,
    CheckCircle,
    AlertTriangle,
} from "lucide-react";

function QuizResult() {

    const { state } = useLocation();

    const navigate = useNavigate();

    if (!state) {

        return (

            <DashboardLayout>

                <div className="text-center py-20 text-2xl">

                    Result Not Found

                </div>

            </DashboardLayout>

        );

    }

    const performance =

        state.percentage >= 90

            ? {

                  title: "Excellent Performance",

                  color: "bg-green-600",

                  icon: "🏆",

              }

            : state.percentage >= 75

            ? {

                  title: "Great Job",

                  color: "bg-cyan-600",

                  icon: "🔥",

              }

            : state.percentage >= 50

            ? {

                  title: "Good Progress",

                  color: "bg-yellow-600",

                  icon: "👍",

              }

            : {

                  title: "Needs More Practice",

                  color: "bg-red-600",

                  icon: "📚",

              };

    return (

        <DashboardLayout>

            <div className="max-w-6xl mx-auto space-y-8">

                {/* Hero */}

                <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 rounded-3xl p-10 text-center shadow-xl">

                    <Trophy

                        size={80}

                        className="mx-auto mb-5 text-yellow-300"

                    />

                    <h1 className="text-5xl font-bold">

                        Congratulations 🎉

                    </h1>

                    <p className="mt-3 text-lg opacity-90">

                        You have successfully completed the quiz.

                    </p>

                </div>

                {/* Performance */}

                <div

                    className={`${performance.color} rounded-2xl p-6 text-center text-2xl font-bold shadow-lg`}

                >

                    {performance.icon} {performance.title}

                </div>

                {/* Stats */}

                <div className="grid md:grid-cols-5 gap-6">

                    <div className="bg-slate-900 rounded-2xl p-6 text-center shadow">

                        <Target

                            className="mx-auto text-cyan-400 mb-3"

                            size={40}

                        />

                        <h2 className="text-4xl font-bold">

                            {state.score}

                        </h2>

                        <p className="text-gray-400">

                            Score

                        </p>

                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 text-center shadow">

                        <TrendingUp

                            className="mx-auto text-green-400 mb-3"

                            size={40}

                        />

                        <h2 className="text-4xl font-bold">

                            {state.percentage}%

                        </h2>

                        <p className="text-gray-400">

                            Percentage

                        </p>

                        <div className="mt-4">

                            <div className="w-full bg-slate-700 rounded-full h-3">

                                <div

                                    className="bg-green-500 h-3 rounded-full transition-all duration-700"

                                    style={{

                                        width: `${state.percentage}%`

                                    }}

                                />

                            </div>

                        </div>

                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 text-center shadow">

                        <Star

                            className="mx-auto text-yellow-400 mb-3"

                            size={40}

                        />

                        <h2 className="text-4xl font-bold">

                            +{state.xp || 0}

                        </h2>

                        <p className="text-gray-400">

                            XP Earned

                        </p>

                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 text-center shadow">

                        <Award

                            className="mx-auto text-purple-400 mb-3"

                            size={40}

                        />

                        <h2 className="text-4xl font-bold">

                            {state.level || 1}

                        </h2>

                        <p className="text-gray-400">

                            Level

                        </p>

                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 text-center shadow">

                        <CheckCircle

                            className="mx-auto text-green-400 mb-3"

                            size={40}

                        />

                        <h2 className="text-4xl font-bold">

                            {state.totalMarks || "-"}

                        </h2>

                        <p className="text-gray-400">

                            Total Marks

                        </p>

                    </div>

                </div>

                {/* AI Section */}

                <div className="grid lg:grid-cols-2 gap-6">

                    <div className="bg-slate-900 rounded-2xl p-8">

                        <div className="flex items-center gap-3 mb-5">

                            <Brain className="text-cyan-400" />

                            <h2 className="text-2xl font-bold">

                                AI Analysis

                            </h2>

                        </div>

                        <div className="space-y-5">

                            <div>

                                <p className="text-gray-400">

                                    Learning Category

                                </p>

                                <h3 className="text-2xl font-bold text-cyan-400">

                                    {state.aiCategory}

                                </h3>

                            </div>

                            <div>

                                <p className="text-gray-400">

                                    Recommendation

                                </p>

                                <div className="bg-slate-800 rounded-xl p-4 mt-2">

                                    {state.recommendation}

                                </div>

                            </div>

                            <div className="bg-slate-800 rounded-xl p-4">

                                <strong>

                                    Overall Feedback

                                </strong>

                                <p className="mt-2">

                                    {

                                        state.percentage >= 90

                                            ? "Outstanding performance! Keep maintaining this consistency."

                                            : state.percentage >= 75

                                            ? "Very good work. A little more practice can make you excellent."

                                            : state.percentage >= 50

                                            ? "Good attempt. Focus on weak topics."

                                            : "Practice regularly and revise fundamentals."

                                    }

                                </p>

                            </div>

                        </div>

                    </div>
                                        {/* Learning Coach */}

                    <div className="bg-slate-900 rounded-2xl p-8">

                        <div className="flex items-center gap-3 mb-5">

                            <AlertTriangle className="text-yellow-400" />

                            <h2 className="text-2xl font-bold">

                                AI Learning Coach

                            </h2>

                        </div>

                        <div className="space-y-4">

                            <div className="bg-slate-800 rounded-xl p-4">

                                <strong>

                                    Strongest Topic

                                </strong>

                                <p className="mt-2">

                                    {

                                        state.learningCoach?.strongestTopic ||

                                        "N/A"

                                    }

                                </p>

                            </div>

                            <div className="bg-slate-800 rounded-xl p-4">

                                <strong>

                                    Weakest Topic

                                </strong>

                                <p className="mt-2">

                                    {

                                        state.learningCoach?.weakestTopic ||

                                        "N/A"

                                    }

                                </p>

                            </div>

                            <div className="bg-slate-800 rounded-xl p-4">

                                <strong>

                                    Suggested Study Time

                                </strong>

                                <p className="mt-2">

                                    {

                                        state.learningCoach?.recommendedStudyTime ||

                                        0

                                    } mins/day

                                </p>

                            </div>

                            <div className="bg-slate-800 rounded-xl p-4">

                                <strong>

                                    Predicted Next Score

                                </strong>

                                <p className="mt-2">

                                    {

                                        state.learningCoach?.estimatedNextScore ||

                                        0

                                    }%

                                </p>

                            </div>

                            <div className="bg-slate-800 rounded-xl p-4">

                                <strong>

                                    AI Confidence

                                </strong>

                                <p className="mt-2">

                                    {

                                        state.learningCoach?.confidence ||

                                        0

                                    }%

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Badges */}

                <div className="bg-slate-900 rounded-2xl p-8">

                    <h2 className="text-2xl font-bold mb-5">

                        🏅 Badges Earned

                    </h2>

                    <div className="flex flex-wrap gap-3">

                        {

                            (state.badges || []).length > 0 ?

                            (

                                state.badges.map(

                                    (badge,index)=>(

                                        <span

                                            key={index}

                                            className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold"

                                        >

                                            🏆 {badge}

                                        </span>

                                    )

                                )

                            )

                            :

                            (

                                <p className="text-gray-400">

                                    No badges earned yet.

                                </p>

                            )

                        }

                    </div>

                </div>

                {/* Performance Summary */}

                <div className="bg-slate-900 rounded-2xl p-8">

                    <h2 className="text-2xl font-bold mb-6">

                        📊 Performance Summary

                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="bg-slate-800 rounded-xl p-5 text-center">

                            <h3 className="text-green-400 text-xl font-bold">

                                Accuracy

                            </h3>

                            <p className="text-4xl mt-3 font-bold">

                                {state.percentage}%

                            </p>

                        </div>

                        <div className="bg-slate-800 rounded-xl p-5 text-center">

                            <h3 className="text-cyan-400 text-xl font-bold">

                                XP Earned

                            </h3>

                            <p className="text-4xl mt-3 font-bold">

                                +{state.xp || 0}

                            </p>

                        </div>

                        <div className="bg-slate-800 rounded-xl p-5 text-center">

                            <h3 className="text-purple-400 text-xl font-bold">

                                Current Level

                            </h3>

                            <p className="text-4xl mt-3 font-bold">

                                {state.level || 1}

                            </p>

                        </div>

                    </div>

                </div>

                {/* Action Buttons */}

                <div className="flex flex-wrap gap-4">

                    <button

                        onClick={()=>

                            navigate("/student/dashboard")

                        }

                        className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-3 rounded-xl flex items-center gap-2"

                    >

                        <ArrowLeft size={18}/>

                        Dashboard

                    </button>

                    <button

                        onClick={()=>

                            navigate("/student/quizzes")

                        }

                        className="bg-green-600 hover:bg-green-700 transition px-8 py-3 rounded-xl flex items-center gap-2"

                    >

                        <RotateCcw size={18}/>

                        Attempt Another Quiz

                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default QuizResult;                                           