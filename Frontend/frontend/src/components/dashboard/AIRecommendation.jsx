import React from "react";
import {
    FaBrain,
    FaBullseye,
    FaArrowTrendUp,
    FaClock,
    FaLightbulb,
    FaShieldAlt,
} from "react-icons/fa";

const AIRecommendation = ({ recommendation }) => {

    const coach = recommendation?.learningCoach || {};

    return (
        <div className="card shadow-lg border-0 h-100">

            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">
                    <FaBrain className="me-2" />
                    AI Learning Coach
                </h4>
            </div>

            <div className="card-body">

                <div className="mb-4">

                    <h6 className="text-muted">
                        Personalized Recommendation
                    </h6>

                    <div className="alert alert-info mb-0">

                        {recommendation?.message ||
                            recommendation ||
                            "Complete more quizzes to unlock personalized recommendations."}

                    </div>

                </div>

                <div className="row g-3">

                    <div className="col-6">

                        <div className="card bg-success text-white border-0">

                            <div className="card-body text-center">

                                <FaBullseye size={24} />

                                <h6 className="mt-2">
                                    Strongest Topic
                                </h6>

                                <h5>
                                    {coach.strongestTopic || "-"}
                                </h5>

                            </div>

                        </div>

                    </div>

                    <div className="col-6">

                        <div className="card bg-danger text-white border-0">

                            <div className="card-body text-center">

                                <FaLightbulb size={24} />

                                <h6 className="mt-2">
                                    Weakest Topic
                                </h6>

                                <h5>
                                    {coach.weakestTopic || "-"}
                                </h5>

                            </div>

                        </div>

                    </div>

                    <div className="col-6">

                        <div className="card bg-warning border-0">

                            <div className="card-body text-center">

                                <FaClock size={24} />

                                <h6 className="mt-2">
                                    Study Time
                                </h6>

                                <h5>
                                    {coach.recommendedStudyTime || 0} mins
                                </h5>

                            </div>

                        </div>

                    </div>

                    <div className="col-6">

                        <div className="card bg-info text-white border-0">

                            <div className="card-body text-center">

                                <FaArrowTrendUp size={24} />

                                <h6 className="mt-2">
                                    Predicted Score
                                </h6>

                                <h5>
                                    {coach.estimatedNextScore || 0}%
                                </h5>

                            </div>

                        </div>

                    </div>

                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center">

                    <span>

                        <FaShieldAlt className="me-2" />

                        AI Confidence

                    </span>

                    <span className="badge bg-success fs-6">

                        {coach.confidence || 0}%

                    </span>

                </div>

            </div>

        </div>
    );
};

export default AIRecommendation;