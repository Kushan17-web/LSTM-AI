import { useForm } from "react-hook-form";

function LessonForm({
    onSubmit,
    defaultValues = {},
    buttonText = "Save Lesson"
}) {

    const {
        register,
        handleSubmit
    } = useForm({
        defaultValues
    });

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >

            <div>

                <label className="block mb-2">

                    Lesson Title

                </label>

                <input
                    {...register("title", {
                        required: true
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4"
                />

            </div>

            <div>

                <label className="block mb-2">

                    Description

                </label>

                <textarea
                    rows={4}
                    {...register("description")}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4"
                />

            </div>

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <label className="block mb-2">

                        Video URL

                    </label>

                    <input
                        {...register("videoUrl")}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4"
                    />

                </div>

                <div>

                    <label className="block mb-2">

                        Notes URL

                    </label>

                    <input
                        {...register("notesUrl")}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4"
                    />

                </div>

            </div>

            <div className="grid grid-cols-3 gap-6">

                <div>

                    <label className="block mb-2">

                        Duration (min)

                    </label>

                    <input
                        type="number"
                        {...register("duration")}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4"
                    />

                </div>

                <div>

                    <label className="block mb-2">

                        Order

                    </label>

                    <input
                        type="number"
                        {...register("order")}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4"
                    />

                </div>

                <div className="flex items-center gap-3 mt-8">

                    <input
                        type="checkbox"
                        {...register("isPreview")}
                    />

                    <label>

                        Free Preview

                    </label>

                </div>

            </div>

            <button
                className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold"
            >

                {buttonText}

            </button>

        </form>

    );

}

export default LessonForm;