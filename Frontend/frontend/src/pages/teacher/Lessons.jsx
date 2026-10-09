import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import LessonTable from "../../components/LessonTable";

import {
    getLessons,
    deleteLesson
} from "../../services/lessonService";

function Lessons() {

    const navigate = useNavigate();

    const { courseId } = useParams();

    const [lessons, setLessons] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadLessons();

    }, []);

    const loadLessons = async () => {

        try {

            const data = await getLessons(courseId);

            setLessons(data.lessons);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (lesson) => {

        if (!window.confirm(`Delete "${lesson.title}" ?`))
            return;

        try {

            await deleteLesson(courseId, lesson._id);

            loadLessons();

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Delete Failed"
            );

        }

    };

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-4xl font-bold">

                            Lessons

                        </h1>

                        <p className="text-gray-400 mt-2">

                            Manage course lessons.

                        </p>

                    </div>

                    <button

                        onClick={() =>
                            navigate(
                                `/teacher/courses/${courseId}/lessons/add`
                            )
                        }

                        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold"

                    >

                        + Add Lesson

                    </button>

                </div>

                {

                    loading

                        ?

                        (

                            <div className="text-center py-16">

                                Loading Lessons...

                            </div>

                        )

                        :

                        (

                            <LessonTable

                                lessons={lessons}

                                onDelete={handleDelete}

                                onEdit={(lesson) =>

                                    navigate(

                                        `/teacher/courses/${courseId}/lessons/edit/${lesson._id}`

                                    )

                                }

                            />

                        )

                }

            </div>

        </DashboardLayout>

    );

}

export default Lessons;