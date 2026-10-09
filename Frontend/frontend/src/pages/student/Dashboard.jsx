import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import AIInsightCard from "../../components/AIInsightCard";
import RecentActivity from "../../components/RecentActivity";

import { getTeacherDashboard } from "../../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        statistics: {},
        categories: {},
        topStudents: []
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getTeacherDashboard();

            setDashboard(data);

        } catch (err) {

            console.error("Dashboard Error:", err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <DashboardLayout>
                <div className="text-center py-20 text-gray-400">
                    Loading dashboard...
                </div>
            </DashboardLayout>
        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Teacher Dashboard
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Welcome back. Here's today's overview.
                    </p>

                </div>

                <div className="grid grid-cols-4 gap-6">

                    <StatCard
                        title="Courses"
                        value={dashboard.statistics.totalCourses ?? 0}
                        subtitle="Published Courses"
                        color="bg-cyan-500"
                    />

                    <StatCard
                        title="Students"
                        value={dashboard.statistics.totalStudents ?? 0}
                        subtitle="Registered Students"
                        color="bg-green-500"
                    />

                    <StatCard
                        title="Quizzes"
                        value={dashboard.statistics.totalQuizzes ?? 0}
                        subtitle="Available Quizzes"
                        color="bg-purple-500"
                    />

                    <StatCard
                        title="Learning Power"
                        value={dashboard.statistics.averageLearningPower ?? 0}
                        subtitle="Average Score"
                        color="bg-orange-500"
                    />

                </div>

                <div className="grid grid-cols-3 gap-6">

                    <div className="col-span-2 bg-slate-900 rounded-2xl border border-slate-800 h-[380px] flex items-center justify-center">

                        <h2 className="text-gray-400 text-xl">
                            Performance Chart (Next Step)
                        </h2>

                    </div>

                    <AIInsightCard />

                </div>

                <RecentActivity />

            </div>

        </DashboardLayout>

    );

}

export default Dashboard;