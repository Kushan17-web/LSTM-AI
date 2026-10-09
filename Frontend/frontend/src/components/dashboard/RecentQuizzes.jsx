import React from "react";
import {
    FaClipboardCheck,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
} from "react-icons/fa";

const RecentQuizzes = ({ quizzes = [] }) => {
    if (quizzes.length === 0) {
        return (
            <div className="card shadow-lg border-0 h-100">
                <div className="card-body text-center py-5">
                    <FaClipboardCheck
                        size={55}
                        className="text-primary mb-3"
                    />

                    <h4>No Quiz Attempts Yet</h4>

                    <p className="text-muted">
                        Start solving quizzes to track your progress.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-lg border-0 h-100">

            <div className="card-header bg-white border-0">
                <h4 className="mb-0">
                    📝 Recent Quiz Attempts
                </h4>
            </div>

            <div className="card-body">

                {quizzes.map((quiz) => {

                    const score =
                        quiz.percentage ??
                        quiz.score ??
                        0;

                    const passed = score >= 40;

                    return (

                        <div
                            key={quiz._id}
                            className="card border-0 shadow-sm mb-3"
                        >
                            <div className="card-body">

                                <div className="d-flex justify-content-between">

                                    <div>

                                        <h5>
                                            {quiz.quiz?.title ||
                                                "Quiz"}
                                        </h5>

                                        <small className="text-muted">
                                            {quiz.course?.title ||
                                                "Course"}
                                        </small>

                                    </div>

                                    <div>

                                        <span
                                            className={`badge ${
                                                passed
                                                    ? "bg-success"
                                                    : "bg-danger"
                                            } fs-6`}
                                        >
                                            {score}%
                                        </span>

                                    </div>

                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        {passed ? (
                                            <span className="text-success">

                                                <FaCheckCircle className="me-2" />

                                                Passed

                                            </span>
                                        ) : (
                                            <span className="text-danger">

                                                <FaTimesCircle className="me-2" />

                                                Failed

                                            </span>
                                        )}

                                    </div>

                                    <div className="text-muted">

                                        <FaClock className="me-2" />

                                        {quiz.createdAt
                                            ? new Date(
                                                  quiz.createdAt
                                              ).toLocaleDateString()
                                            : "Today"}

                                    </div>

                                </div>

                            </div>
                        </div>

                    );

                })}

            </div>

        </div>
    );
};

export default RecentQuizzes;