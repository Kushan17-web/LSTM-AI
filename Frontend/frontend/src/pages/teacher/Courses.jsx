import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import CourseTable from "../../components/CourseTable";

import {
    getCourses,
    deleteCourse
} from "../../services/courseService";

function Courses() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadCourses();

    }, []);

    const loadCourses = async () => {

        try {

            const res = await getCourses();

            setCourses(res.courses || []);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (course) => {

        const confirmDelete = window.confirm(
            `Delete "${course.title}" ?`
        );

        if (!confirmDelete) return;

        try {

            await deleteCourse(course._id);

            loadCourses();

        } catch (err) {

            alert(err.response?.data?.message || "Delete Failed");

        }

    };

    const filteredCourses = useMemo(() => {

        return courses.filter(course =>

            course.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            course.category
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [courses, search]);

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-4xl font-bold">

                            Courses

                        </h1>

                        <p className="text-gray-400 mt-2">

                            Manage your learning content.

                        </p>

                    </div>

                    <button

                        onClick={() =>
                            navigate("/teacher/courses/add")
                        }

                        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold"

                    >

                        + Add Course

                    </button>

                </div>

                <input

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                    placeholder="Search Courses..."

                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 outline-none"

                />

                {

                    loading

                        ?

                        (

                            <div className="text-center py-16">

                                Loading Courses...

                            </div>

                        )

                        :

                        (

                            <CourseTable

                                courses={filteredCourses}

                                onDelete={handleDelete}

                                onEdit={(course) =>

                                    navigate(
                                        `/teacher/courses/edit/${course._id}`
                                    )

                                }

                            />

                        )

                }

            </div>

        </DashboardLayout>

    );

}

export default Courses;