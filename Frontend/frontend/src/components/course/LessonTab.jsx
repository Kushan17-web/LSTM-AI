import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import LessonCard from "./LessonCard";

import {
    getLessons,
    deleteLesson
} from "../../services/lessonService";

function LessonTab({ courseId }) {

    const [lessons, setLessons] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadLessons();

    }, []);

    const loadLessons = async () => {

        try {

            const data = await getLessons(courseId);

            setLessons(data.lessons);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    const handleDelete = async (lesson) => {

        if (!window.confirm("Delete lesson?"))
            return;

        await deleteLesson(courseId, lesson._id);

        loadLessons();

    };

    const handleEdit = (lesson) => {

        console.log("Edit", lesson);

    };

    if (loading) {

        return (

            <div className="text-center py-20">

                Loading Lessons...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">

                        Lessons

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Manage your course lessons.

                    </p>

                </div>

                <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl flex items-center gap-3 font-semibold transition">

                    <Plus size={20} />

                    Add Lesson

                </button>

            </div>

            {

                lessons.length === 0 ? (

                    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-20 text-center">

                        <h2 className="text-2xl font-semibold">

                            No Lessons Yet

                        </h2>

                        <p className="text-gray-400 mt-3">

                            Start building your course by adding your first lesson.

                        </p>

                    </div>

                ) : (

                    <div className="space-y-5">

                        {

                            lessons.map((lesson) => (

                                <LessonCard
                                    key={lesson._id}
                                    lesson={lesson}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default LessonTab;