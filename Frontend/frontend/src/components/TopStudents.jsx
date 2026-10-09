function TopStudents({ students }) {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-6">

                Top Students

            </h2>

            <div className="space-y-4">

                {

                    students.map((student, index) => (

                        <div
                            key={student._id}
                            className="flex justify-between border-b border-slate-800 pb-3"
                        >

                            <span>

                                {index + 1}. {student.student?.name}

                            </span>

                            <span className="font-semibold text-cyan-400">

                                {student.learningPower}

                            </span>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default TopStudents;