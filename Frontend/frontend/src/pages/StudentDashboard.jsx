import { useEffect, useState } from "react";
import { getStudentDashboard } from "../services/dashboardService";
import DashboardStats from "../components/dashboard/DashboardStats";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import ContinueLearning from "../components/dashboard/ContinueLearning";
import RecentQuizzes from "../components/dashboard/RecentQuizzes";
import AIRecommendation from "../components/dashboard/AIRecommendation";

const StudentDashboard = () => {

    const [dashboard, setDashboard] = useState(null);

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

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <div className="spinner-border text-primary" />

                <h4 className="mt-3">

                    Loading Dashboard...

                </h4>

            </div>

        );

    }

    return (

        <div className="container py-4">

            {/* Header */}

            <div className="card shadow-lg border-0 mb-4">

                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>

                        <h2 className="fw-bold">

                            👋 Welcome Back

                        </h2>

                        <p className="text-muted mb-0">

                            Keep learning and improve every day.

                        </p>

                    </div>

                    <div className="text-end">

                        <h4 className="text-warning">

                            ⭐ {dashboard.statistics.xp} XP

                        </h4>

                        <h5>

                            🔥 Level {dashboard.statistics.level}

                        </h5>

                    </div>

                </div>

            </div>

            {/* Statistics */}

            <DashboardStats

                statistics={dashboard.statistics}

            />

            {/* Chart + AI */}

            <div className="row mt-4">

                <div className="col-lg-8">

                    <PerformanceChart

                        data={dashboard.weeklyProgress}

                    />

                </div>

                <div className="col-lg-4">

                    <AIRecommendation

                        recommendation={dashboard.aiInsights}

                    />

                </div>

            </div>

            {/* Badges */}

            <div className="card shadow-lg border-0 mt-4">

                <div className="card-header bg-warning">

                    <h4 className="mb-0">

                        🏆 Achievements

                    </h4>

                </div>

                <div className="card-body">

                    {

                        dashboard.badges.length === 0 ?

                            (

                                <p className="text-muted">

                                    No badges earned yet.

                                </p>

                            )

                            :

                            (

                                <div className="d-flex flex-wrap gap-3">

                                    {

                                        dashboard.badges.map(

                                            (badge, index) => (

                                                <span

                                                    key={index}

                                                    className="badge bg-success fs-6"

                                                >

                                                    🏅 {badge}

                                                </span>

                                            )

                                        )

                                    }

                                </div>

                            )

                    }

                </div>

            </div>

            {/* Study Plan */}

            <div className="card shadow-lg border-0 mt-4">

                <div className="card-header bg-info text-white">

                    <h4 className="mb-0">

                        📅 Today's AI Study Plan

                    </h4>

                </div>

                <div className="card-body">

                    {

                        dashboard.studyPlan.map(

                            (item, index) => (

                                <div

                                    key={index}

                                    className="d-flex justify-content-between align-items-center border-bottom py-3"

                                >

                                    <div>

                                        <h6>

                                            {item.topic}

                                        </h6>

                                        <small>

                                            {item.duration}

                                        </small>

                                    </div>

                                    <span className="badge bg-danger">

                                        {item.priority}

                                    </span>

                                </div>

                            )

                        )

                    }

                </div>

            </div>
                        {/* Notifications */}

            <div className="card shadow-lg border-0 mt-4">

                <div className="card-header bg-secondary text-white">

                    <h4 className="mb-0">

                        🔔 Recent Notifications

                    </h4>

                </div>

                <div className="card-body">

                    {

                        dashboard.notifications.length === 0 ?

                            (

                                <p className="text-muted">

                                    No notifications available.

                                </p>

                            )

                            :

                            (

                                dashboard.notifications.map(

                                    (notification) => (

                                        <div

                                            key={notification._id}

                                            className="border-bottom py-3"

                                        >

                                            <h6>

                                                {notification.title}

                                            </h6>

                                            <p className="mb-1 text-muted">

                                                {notification.message}

                                            </p>

                                            <small className="text-secondary">

                                                {

                                                    notification.createdAt

                                                        ?

                                                        new Date(

                                                            notification.createdAt

                                                        ).toLocaleString()

                                                        :

                                                        ""

                                                }

                                            </small>

                                        </div>

                                    )

                                )

                            )

                    }

                </div>

            </div>

            {/* Continue Learning & Recent Quiz */}

            <div className="row mt-4">

                <div className="col-lg-6">

                    <ContinueLearning

                        courses={dashboard.continueLearning}

                    />

                </div>

                <div className="col-lg-6">

                    <RecentQuizzes

                        quizzes={dashboard.recentQuizzes}

                    />

                </div>

            </div>

        </div>

    );

};

export default StudentDashboard;