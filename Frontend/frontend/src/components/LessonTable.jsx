import {
    Pencil,
    Trash2
} from "lucide-react";

function LessonTable({

    lessons,

    onEdit,

    onDelete

}) {

    return (

        <div className="overflow-hidden rounded-2xl border border-slate-800">

            <table className="w-full">

                <thead className="bg-slate-900">

                    <tr>

                        <th className="p-5 text-left">

                            Order

                        </th>

                        <th>

                            Lesson

                        </th>

                        <th>

                            Duration

                        </th>

                        <th>

                            Preview

                        </th>

                        <th>

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        lessons.map((lesson) => (

                            <tr
                                key={lesson._id}
                                className="border-t border-slate-800"
                            >

                                <td className="p-5">

                                    {lesson.order}

                                </td>

                                <td>

                                    {lesson.title}

                                </td>

                                <td>

                                    {lesson.duration} min

                                </td>

                                <td>

                                    {

                                        lesson.isPreview

                                            ? "Yes"

                                            : "No"

                                    }

                                </td>

                                <td>

                                    <div className="flex justify-center gap-4">

                                        <button
                                            onClick={() => onEdit(lesson)}
                                        >

                                            <Pencil size={18} />

                                        </button>

                                        <button
                                            onClick={() => onDelete(lesson)}
                                        >

                                            <Trash2
                                                size={18}
                                                className="text-red-400"
                                            />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default LessonTable;