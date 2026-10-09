function OverviewTab({ course }) {

    return (

        <div className="space-y-8">

            <div className="grid grid-cols-4 gap-6">

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                    <h3 className="text-gray-400">
                        Category
                    </h3>

                    <p className="text-xl font-semibold mt-3">
                        {course.category}
                    </p>

                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                    <h3 className="text-gray-400">
                        Difficulty
                    </h3>

                    <p className="text-xl font-semibold mt-3">
                        {course.difficulty}
                    </p>

                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                    <h3 className="text-gray-400">
                        Price
                    </h3>

                    <p className="text-xl font-semibold mt-3">

                        ₹{course.price}

                    </p>

                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                    <h3 className="text-gray-400">
                        Students
                    </h3>

                    <p className="text-xl font-semibold mt-3">

                        {course.students.length}

                    </p>

                </div>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

                <h2 className="text-2xl font-bold mb-5">

                    Description

                </h2>

                <p className="text-gray-400 leading-8">

                    {course.description}

                </p>

            </div>

        </div>

    );

}

export default OverviewTab;