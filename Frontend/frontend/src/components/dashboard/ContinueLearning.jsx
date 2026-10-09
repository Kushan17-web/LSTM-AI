import React from "react";
import { FaPlayCircle, FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ContinueLearning = ({ courses = [] }) => {
    const navigate = useNavigate();

    if (courses.length === 0) {
        return (
            <div className="card shadow-lg border-0 h-100">
                <div className="card-body text-center py-5">
                    <FaBookOpen size={50} className="text-primary mb-3" />
                    <h4>No Enrolled Courses</h4>
                    <p className="text-muted">
                        Enroll in a course to start learning.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-lg border-0 h-100">
            <div className="card-header bg-white border-0">
                <h4 className="mb-0">📚 Continue Learning</h4>
            </div>

            <div className="card-body">
                {courses.map((course) => (
                    <div
                        key={course._id}
                        className="card mb-3 border-0 shadow-sm"
                    >
                        <div className="row g-0 align-items-center">

                            <div className="col-md-3 text-center p-3">
                                <img
                                    src={
                                        course.thumbnail ||
                                        "https://placehold.co/120x120?text=Course"
                                    }
                                    alt={course.title}
                                    className="img-fluid rounded"
                                />
                            </div>

                            <div className="col-md-9">
                                <div className="card-body">

                                    <h5>{course.title}</h5>

                                    <div className="progress mb-3">
                                        <div
                                            className="progress-bar bg-success"
                                            style={{
                                                width: `${course.progress}%`,
                                            }}
                                        >
                                            {course.progress}%
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            navigate(
                                                `/student/course/${course._id}`
                                            )
                                        }
                                    >
                                        <FaPlayCircle className="me-2" />
                                        Resume Learning
                                    </button>

                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContinueLearning;