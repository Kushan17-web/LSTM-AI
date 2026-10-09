import React from "react";
import {
    FaBookOpen,
    FaCheckCircle,
    FaClipboardCheck,
    FaChartLine,
    FaStar,
    FaFire,
    FaTrophy,
} from "react-icons/fa";

const DashboardStats = ({ statistics }) => {
    if (!statistics) return null;

    const cards = [
        {
            title: "Enrolled Courses",
            value: statistics.enrolledCourses || 0,
            icon: <FaBookOpen size={26} />,
            color: "primary",
        },
        {
            title: "Completed Lessons",
            value: statistics.completedLessons || 0,
            icon: <FaCheckCircle size={26} />,
            color: "success",
        },
        {
            title: "Completed Quizzes",
            value: statistics.completedQuizzes || 0,
            icon: <FaClipboardCheck size={26} />,
            color: "warning",
        },
        {
            title: "Average Score",
            value: `${statistics.averageScore || 0}%`,
            icon: <FaChartLine size={26} />,
            color: "info",
        },
        {
            title: "XP",
            value: statistics.xp || 0,
            icon: <FaStar size={26} />,
            color: "secondary",
        },
        {
            title: "Level",
            value: statistics.level || 1,
            icon: <FaTrophy size={26} />,
            color: "dark",
        },
        {
            title: "Streak",
            value: `${statistics.streak || 0} Days`,
            icon: <FaFire size={26} />,
            color: "danger",
        },
    ];

    return (
        <div className="row g-4">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="col-xl-3 col-lg-4 col-md-6"
                >
                    <div
                        className={`card border-0 shadow-lg h-100 bg-${card.color} text-white`}
                    >
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="mb-2">
                                    {card.title}
                                </h6>

                                <h2 className="fw-bold mb-0">
                                    {card.value}
                                </h2>
                            </div>

                            <div>{card.icon}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;