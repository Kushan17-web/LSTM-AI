import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from "recharts";

const COLORS = [
    "#06b6d4",
    "#22c55e",
    "#f97316",
    "#ef4444"
];

function LearningCategoryChart({ categories }) {

    const data = [

        {
            name: "Fast",
            value: categories.fastLearners || 0
        },

        {
            name: "Average",
            value: categories.averageLearners || 0
        },

        {
            name: "Practice",
            value: categories.needsPractice || 0
        },

        {
            name: "At Risk",
            value: categories.atRisk || 0
        }

    ];

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[380px]">

            <h2 className="text-xl font-semibold mb-6">

                Learning Categories

            </h2>

            <ResponsiveContainer width="100%" height="90%">

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={100}
                    >

                        {

                            data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))

                        }

                    </Pie>

                    <Tooltip />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default LearningCategoryChart;