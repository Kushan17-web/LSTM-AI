import {
    GripVertical,
    PlayCircle,
    Pencil,
    Trash2,
    Clock3
} from "lucide-react";

function LessonCard({
    lesson,
    onEdit,
    onDelete
}) {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition-all">

            <div className="flex justify-between items-center">

                <div className="flex items-center gap-5">

                    <GripVertical
                        size={22}
                        className="text-gray-500 cursor-grab"
                    />

                    <div className="bg-cyan-500/20 p-3 rounded-xl">

                        <PlayCircle
                            size={22}
                            className="text-cyan-400"
                        />

                    </div>

                    <div>

                        <h2 className="text-xl font-semibold">

                            {lesson.order}. {lesson.title}

                        </h2>

                        <div className="flex items-center gap-5 mt-2 text-gray-400">

                            <div className="flex items-center gap-2">

                                <Clock3 size={16} />

                                {lesson.duration} min

                            </div>

                            {

                                lesson.isPreview && (

                                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">

                                        Preview Enabled

                                    </span>

                                )

                            }

                        </div>

                    </div>

                </div>

                <div className="flex gap-4">

                    <button
                        onClick={() => onEdit(lesson)}
                        className="bg-slate-800 hover:bg-cyan-500 p-3 rounded-xl transition"
                    >

                        <Pencil size={18} />

                    </button>

                    <button
                        onClick={() => onDelete(lesson)}
                        className="bg-slate-800 hover:bg-red-500 p-3 rounded-xl transition"
                    >

                        <Trash2 size={18} />

                    </button>

                </div>

            </div>

        </div>

    );

}

export default LessonCard;