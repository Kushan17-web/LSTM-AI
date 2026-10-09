import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {

    BookOpen,

    GraduationCap,

    Trophy,

    Flame,

    PlayCircle,

    Brain,

    TrendingUp

} from "lucide-react";

import { getStudentDashboard } from "../../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState({

        statistics: {

            enrolledCourses: 0,

            completedLessons: 0,

            completedQuizzes: 0,

            streak: 0

        },

        continueLearning: [],

        recentResults: [],

        recommendation: ""

    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getStudentDashboard();

            setDashboard(data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <DashboardLayout>

                <div className="text-center py-20">

                    Loading Dashboard...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* Welcome */}

                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-10">

                    <h1 className="text-4xl font-bold">

                        Welcome Back 👋

                    </h1>

                    <p className="text-cyan-100 mt-3">

                        Continue learning and improve your skills.

                    </p>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-4 gap-6">

                    <div className="bg-slate-900 rounded-2xl p-6">

                        <BookOpen className="text-cyan-400 mb-3" />

                        <h2 className="text-3xl font-bold">

                            {dashboard.statistics.enrolledCourses}

                        </h2>

                        <p className="text-gray-400">

                            Enrolled Courses

                        </p>

                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6">

                        <GraduationCap className="text-green-400 mb-3" />

                        <h2 className="text-3xl font-bold">

                            {dashboard.statistics.completedLessons}

                        </h2>

                        <p className="text-gray-400">

                            Lessons Completed

                        </p>

                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6">

                        <Trophy className="text-yellow-400 mb-3" />

                        <h2 className="text-3xl font-bold">

                            {dashboard.statistics.completedQuizzes}

                        </h2>

                        <p className="text-gray-400">

                            Quizzes Completed

                        </p>

                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6">

                        <Flame className="text-red-400 mb-3" />

                        <h2 className="text-3xl font-bold">

                            {dashboard.statistics.streak}

                        </h2>

                        <p className="text-gray-400">

                            Day Streak

                        </p>

                    </div>

                </div>

                {/* Continue Learning */}

                <div>

                    <h2 className="text-3xl font-bold mb-6">

                        Continue Learning

                    </h2>

                    <div className="grid grid-cols-2 gap-6"></div>
                    {

                        dashboard.continueLearning?.length > 0 ?

                            dashboard.continueLearning.map((course) => (

                                <div

                                    key={course._id}

                                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6"

                                >

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <h3 className="text-xl font-bold">

                                                {course.title}

                                            </h3>

                                            <p className="text-gray-400 mt-2">

                                                {course.progress || 0}% Completed

                                            </p>

                                        </div>

                                        <PlayCircle
                                            size={45}
                                            className="text-cyan-400"
                                        />

                                    </div>

                                    <div className="w-full bg-slate-800 rounded-full h-3 mt-6">

                                        <div

                                            className="bg-cyan-500 h-3 rounded-full"

                                            style={{

                                                width: `${course.progress || 0}%`

                                            }}

                                        />

                                    </div>

                                    <button

                                        className="mt-6 bg-cyan-500 hover:bg-cyan-600 transition rounded-xl px-6 py-3 font-semibold"

                                    >

                                        Continue Learning

                                    </button>

                                </div>

                            ))

                            :

                            (

                                <div className="bg-slate-900 rounded-2xl p-12 col-span-2 text-center text-gray-400">

                                    No enrolled courses yet.

                                </div>

                            )

                    }

                </div>

            </div>

            {/* Bottom Section */}

            <div className="grid grid-cols-3 gap-6">

                {/* Recent Results */}

                <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-8">

                    <div className="flex items-center gap-3 mb-6">

                        <TrendingUp className="text-cyan-400" />

                        <h2 className="text-2xl font-bold">

                            Recent Quiz Results

                        </h2>

                    </div>

                    {

                        dashboard.recentResults?.length ?

                            dashboard.recentResults.map((quiz) => (

                                <div

                                    key={quiz._id}

                                    className="flex justify-between items-center py-4 border-b border-slate-800"

                                >

                                    <div>

                                        <h3 className="font-semibold">

                                            {quiz.title}

                                        </h3>

                                        <p className="text-gray-400 text-sm">

                                            {quiz.course}

                                        </p>

                                    </div>

                                    <div className="text-cyan-400 font-bold text-xl">

                                        {quiz.score}%

                                    </div>

                                </div>

                            ))

                            :

                            <div className="text-gray-400">

                                No quizzes attempted yet.

                            </div>

                    }

                </div>

                {/* AI Recommendation */}

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

                    <div className="flex items-center gap-3 mb-6">

                        <Brain className="text-purple-400" />

                        <h2 className="text-2xl font-bold">

                            AI Coach

                        </h2>

                    </div>

                    <div className="bg-slate-800 rounded-xl p-5 text-gray-300 leading-7">

                        {

                            dashboard.recommendation ||

                            "Keep learning consistently. Complete your current course before attempting advanced quizzes."

                        }

                    </div>

                    <button

                        className="w-full mt-6 bg-purple-500 hover:bg-purple-600 transition rounded-xl py-3 font-semibold"

                    >

                        Ask AI Tutor

                    </button>

                </div>

            </div>

        </DashboardLayout >

    );

}

export default Dashboard;