import { Link } from "react-router-dom";
import {
    Pencil,
    Trash2,
    Users,
    BookOpen,
    Eye
} from "lucide-react";

function CourseTable({
    courses,
    onEdit,
    onDelete
}) {

    if (!courses.length) {

        return (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">

                <BookOpen
                    size={60}
                    className="mx-auto text-gray-500 mb-5"
                />

                <h2 className="text-2xl font-semibold text-white">
                    No Courses Found
                </h2>

                <p className="text-gray-400 mt-2">
                    Create your first course.
                </p>

            </div>
        );

    }

    return (

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

            <table className="w-full">

                <thead className="bg-slate-800">

                    <tr>

                        <th className="text-left p-5">
                            Course
                        </th>

                        <th>
                            Category
                        </th>

                        <th>
                            Students
                        </th>

                        <th>
                            Difficulty
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {courses.map((course) => (

                        <tr
                            key={course._id}
                            className="border-t border-slate-800 hover:bg-slate-800 transition"
                        >

                            <td className="p-5">

                                <div>

                                    <Link
                                        to={`/teacher/courses/${course._id}`}
                                        className="text-lg font-semibold text-cyan-400 hover:text-cyan-300"
                                    >
                                        {course.title}
                                    </Link>

                                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                                        {course.description}
                                    </p>

                                </div>

                            </td>

                            <td className="text-center">
                                {course.category}
                            </td>

                            <td>

                                <div className="flex items-center justify-center gap-2">

                                    <Users size={16} />

                                    {course.students?.length || 0}

                                </div>

                            </td>

                            <td className="text-center">

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        course.difficulty === "Beginner"
                                            ? "bg-green-600"
                                            : course.difficulty === "Intermediate"
                                            ? "bg-yellow-500 text-black"
                                            : "bg-red-600"
                                    }`}
                                >
                                    {course.difficulty}
                                </span>

                            </td>

                            <td className="text-center">

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        course.isPublished
                                            ? "bg-green-600"
                                            : "bg-yellow-500 text-black"
                                    }`}
                                >
                                    {course.isPublished
                                        ? "Published"
                                        : "Draft"}
                                </span>

                            </td>

                            <td>

                                <div className="flex items-center justify-center gap-4">

                                    <Link
                                        to={`/teacher/courses/${course._id}`}
                                        className="text-cyan-400 hover:text-cyan-300"
                                        title="View Course"
                                    >
                                        <Eye size={18} />
                                    </Link>

                                    <button
                                        onClick={() => onEdit(course)}
                                        className="text-cyan-400 hover:text-cyan-300"
                                        title="Edit Course"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        onClick={() => onDelete(course)}
                                        className="text-red-400 hover:text-red-300"
                                        title="Delete Course"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                    <Link
                                        to={`/teacher/courses/${course._id}/lessons`}
                                        className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                                    >
                                        Lessons
                                    </Link>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default CourseTable;