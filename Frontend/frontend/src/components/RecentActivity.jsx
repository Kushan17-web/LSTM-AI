function RecentActivity() {

    const activities = [

        "Completed Machine Learning Quiz",

        "Enrolled in Data Structures",

        "Scored 92% in Python Assessment",

        "AI Recommended Graph Algorithms"

    ];

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex justify-between mb-6">

                <h2 className="text-xl font-semibold">

                    Recent Activity

                </h2>

                <button className="text-cyan-400">

                    View All

                </button>

            </div>

            <div className="space-y-4">

                {

                    activities.map((item, index) => (

                        <div
                            key={index}
                            className="border-b border-slate-800 pb-3"
                        >

                            {item}

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default RecentActivity;