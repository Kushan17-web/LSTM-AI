import { useForm } from "react-hook-form";

function CourseForm({ onSubmit, defaultValues = {}, buttonText }) {

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

                <label className="block mb-2 font-medium">
                    Course Title
                </label>

                <input
                    {...register("title", {
                        required: true
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none"
                    placeholder="Complete Python Bootcamp"
                />

            </div>

            <div>

                <label className="block mb-2 font-medium">
                    Description
                </label>

                <textarea
                    {...register("description")}
                    rows={5}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none"
                />

            </div>

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <label className="block mb-2">

                        Category

                    </label>

                    <input
                        {...register("category")}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4"
                    />

                </div>

                <div>

                    <label className="block mb-2">

                        Price

                    </label>

                    <input
                        type="number"
                        {...register("price")}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4"
                    />

                </div>

            </div>

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <label className="block mb-2">

                        Difficulty

                    </label>

                    <select
                        {...register("difficulty")}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4"
                    >

                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>

                    </select>

                </div>

                <div>

                    <label className="block mb-2">

                        Thumbnail URL

                    </label>

                    <input
                        {...register("thumbnail")}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4"
                    />

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

export default CourseForm;